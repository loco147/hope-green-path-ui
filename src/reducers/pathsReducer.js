import { turf } from '../utils/index'
import * as paths from './../services/paths'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'

const initialPaths = {
  qPathFC: turf.asFeatureCollection([]),
  sPathFC: turf.asFeatureCollection([]),
  selPathFC: turf.asFeatureCollection([]),
  openedPath: null,
  detourLimit: 0,
  detourLimits: [],
  waitingPaths: false,
  showingPaths: false,
  routingId: 0,
}

const pathsReducer = (store = initialPaths, action) => {

  switch (action.type) {

    case 'ROUTING_STARTED':
      return {
        ...store,
        waitingPaths: true,
        routingId: action.routingId,
      }

    case 'SET_SHORTEST_PATH': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        waitingPaths: false,
        showingPaths: true,
        sPathFC: turf.asFeatureCollection(action.sPath),
      }
    }

    case 'SET_DETOUR_LIMITS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        detourLimits: action.detourLimits,
        detourLimit: action.initialDetourLimit,
      }
    }

    case 'SET_QUIET_PATH': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        qPathFC: turf.asFeatureCollection(action.qPaths)
      }
    }

    case 'SET_SELECTED_PATH': {
      if (action.routingId) {
        const cancelledRouting = store.routingId !== action.routingId
        if (cancelledRouting) return store
      }
      // unselect path by clicking it again
      if (clickedPathAgain(store.selPathFC, action.selPathId)) {
        return {
          ...store,
          selPathFC: turf.asFeatureCollection([])
        }
      } else {
        // select shortest path if no quiet path id match the selected id
        let selPath = store.qPathFC.features.filter(feat => feat.properties.id === action.selPathId)
        if (selPath.length === 0) {
          selPath = store.sPathFC.features
        }
        console.log('Selecting path:', selPath[0])
        return {
          ...store,
          // if openedPath is set, change it to the selected path
          openedPath: store.openedPath ? selPath[0] : null,
          selPathFC: turf.asFeatureCollection(selPath),
        }
      }
    }

    case 'UNSET_SELECTED_PATH':
      return {
        ...store,
        selPathFC: turf.asFeatureCollection([])
      }

    case 'SET_OPENED_PATH':
      return {
        ...store,
        selPathFC: turf.asFeatureCollection([action.path]),
        openedPath: action.path,
      }

    case 'UNSET_OPENED_PATH':
      return {
        ...store,
        openedPath: null
      }

    case 'SET_DETOUR_LIMIT':
      return {
        ...store,
        detourLimit: action.detourLimit
      }

    case 'ERROR_IN_ROUTING':
      return { ...store, waitingPaths: false }

    // reset paths and cancel previous routing requests (if any) on these actions
    case 'SET_TARGET':
    case 'WAIT_FOR_USER_LOC_ORIGIN':
    case 'RESET_PATHS':
    case 'SET_ORIGIN':
    case 'SET_ORIGIN_TO_USER_LOC':
      return {
        ...initialPaths,
        showingPaths: false,
        routingId: store.routingId + 1,
      }
    default:
      return store
  }
}

export const getShortestPath = (originCoords, targetCoords) => {
  return async (dispatch) => {
    const pathFC = await paths.getShortestPath(originCoords, targetCoords)
    console.log('pathFC', pathFC)
    dispatch({ type: 'SET_SHORTEST_PATH', pathFC })
  }
}

export const getQuietPaths = (originCoords, targetCoords, prevRoutingId) => {
  return async (dispatch) => {
    const distance = turf.getDistance(originCoords, targetCoords)
    if (distance > 5200) {
      if (!window.confirm('Long distance routing may take longer than 10 s')) {
        return
      }
    }
    const routingId = prevRoutingId + 1
    dispatch({ type: 'ROUTING_STARTED', originCoords, targetCoords, routingId })
    try {
      const pathFeats = await paths.getQuietPaths(originCoords, targetCoords)
      const sPath = pathFeats.filter(feat => feat.properties.type === 'short')
      const qPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.len_diff !== 0)
      const qPathsSorted = qPaths.sort((a, b) => a.properties.len_diff - b.properties.len_diff)
      const detourLimits = utils.getDetourLimits(qPathsSorted)
      const initialDetourLimit = utils.getInitialDetourLimit(detourLimits)
      dispatch({ type: 'SET_DETOUR_LIMITS', detourLimits, initialDetourLimit, routingId })
      dispatch({ type: 'SET_SHORTEST_PATH', sPath, routingId })
      dispatch({ type: 'SET_QUIET_PATH', qPaths: qPathsSorted, routingId })
      const bestPath = utils.getBestPath(qPaths)
      if (bestPath) dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
    } catch (error) {
      dispatch({ type: 'ERROR_IN_ROUTING' })
      dispatch(showNotification("Couldn't get path", 'error', 4))
      return
    }
  }
}

export const setSelectedPath = (selPathId) => {
  return { type: 'SET_SELECTED_PATH', selPathId }
}

export const setOpenedPath = (path) => {
  return { type: 'SET_OPENED_PATH', path }
}

export const unsetOpenedPath = () => {
  return { type: 'UNSET_OPENED_PATH' }
}

export const setDetourLimit = (detourLimit) => {
  return { type: 'SET_DETOUR_LIMIT', detourLimit: parseInt(detourLimit, 10) }
}

export const unsetSelectedPath = () => {
  return { type: 'UNSET_SELECTED_PATH' }
}

export const resetPaths = () => {
  return { type: 'RESET_PATHS' }
}

const clickedPathAgain = (storeSelPathFC, clickedPathId) => {
  return storeSelPathFC.features[0] && clickedPathId === storeSelPathFC.features[0].properties.id
}

export default pathsReducer
