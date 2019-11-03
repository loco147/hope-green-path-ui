import { turf } from '../utils/index'
import * as paths from './../services/paths'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'

const initialPaths = {
  qPathFC: turf.asFeatureCollection([]),
  sPathFC: turf.asFeatureCollection([]),
  selPathFC: turf.asFeatureCollection([]),
  edgeFC: turf.asFeatureCollection([]),
  openedPath: null,
  lengthLimit: { limit: 0, count: 0, label: '' },
  lengthLimits: [],
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

    case 'SET_LENGTH_LIMITS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        lengthLimits: action.lengthLimits,
        lengthLimit: action.initialLengthLimit,
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

    case 'SET_EDGE_FC': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        edgeFC: action.edgeFC
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
        console.log('selecting path:', selPath[0].properties)
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

    case 'SET_LENGTH_LIMIT':
      return {
        ...store,
        lengthLimit: action.lengthLimit
      }

    case 'ERROR_IN_ROUTING':
      return { ...store, waitingPaths: false }

    case 'RESET_PATHS':
      return {
        ...initialPaths,
        showingPaths: false,
        routingId: store.routingId + 1,
      }

    default:
      return store
  }
}

export const testQuietPathServiceConnection = () => {
  return async (dispatch) => {
    const startTime = performance.now()
    try {
      const connTestResponse = await paths.getConnectionTestResponse()
      const tookTime = Math.round(performance.now() - startTime)
      console.log('connection to qp service ok, response:', connTestResponse, 'took:', tookTime, 'ms')
      if (tookTime < 3000) {
        dispatch({ type: 'QP_CONNECTION_OK', tookTime })
      } else {
        dispatch({ type: 'QP_CONNECTION_SLOW', tookTime })
        dispatch(showNotification('Quiet path service is under heavy use at the moment', 'info', 6))
      }
    } catch (error) {
      const tookTime = Math.round(performance.now() - startTime)
      console.log('error in connecting to qp service, took', tookTime, 'ms\n', error)
      dispatch({ type: 'QP_CONNECTION_ERROR', tookTime })
      dispatch(showNotification('Could not connect to quiet path service, please try again later', 'error', 15))
    }
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
      const pathData = await paths.getQuietPaths(originCoords, targetCoords)
      const pathFeats = pathData.path_FC.features
      const sPath = pathFeats.filter(feat => feat.properties.type === 'short')
      const qPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.len_diff !== 0)
      // utils.validateNoiseDiffs(sPath, qPaths)
      const lengthLimits = utils.getLengthLimits(pathFeats)
      const initialLengthLimit = utils.getInitialLengthLimit(lengthLimits)
      dispatch({ type: 'SET_LENGTH_LIMITS', lengthLimits, initialLengthLimit, routingId })
      dispatch({ type: 'SET_SHORTEST_PATH', sPath, routingId })
      dispatch({ type: 'SET_QUIET_PATH', qPaths: qPaths, routingId })
      dispatch({ type: 'SET_EDGE_FC', edgeFC: pathData.edge_FC, routingId })
      const bestPath = utils.getBestPath(qPaths)
      if (bestPath) {
        dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
      } else if (qPaths.length > 0) {
        dispatch({ type: 'SET_SELECTED_PATH', selPathId: 'short_p', routingId })
      }
    } catch (error) {
      console.log('caught error:', error)
      dispatch({ type: 'ERROR_IN_ROUTING' })
      if (typeof error === 'string') {
        dispatch(showNotification(error, 'error', 8))
      } else {
        dispatch(showNotification('Error in routing', 'error', 8))
      }
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

export const setLengthLimit = (lengthLimit) => {
  return { type: 'SET_LENGTH_LIMIT', lengthLimit }
}

export const unsetSelectedPath = () => {
  return { type: 'UNSET_SELECTED_PATH' }
}

export const resetPaths = (lngLat) => {
  return async (dispatch) => {
    dispatch({ type: 'RESET_PATHS', lngLat })
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 6))
  }
}

const clickedPathAgain = (storeSelPathFC, clickedPathId) => {
  return storeSelPathFC.features[0] && clickedPathId === storeSelPathFC.features[0].properties.id
}

export default pathsReducer
