import { turf } from '../utils/index'
import * as paths from './../services/paths'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'
// import { egPaths } from '../temp/eg_path_features.js'

const initialPaths = {
  qPathFC: turf.asFeatureCollection([]),
  sPathFC: turf.asFeatureCollection([]),
  selPathFC: turf.asFeatureCollection([]),
  detourLimit: 0,
  detourLimits: [],
  waitingPaths: false,
}

const pathsReducer = (store = initialPaths, action) => {

  switch (action.type) {
    case 'ROUTING_STARTED':
      return {
        ...store,
        waitingPaths: true
      }
    case 'SET_SHORTEST_PATH':
      return {
        ...store,
        waitingPaths: false,
        sPathFC: turf.asFeatureCollection(action.sPath)
      }
    case 'SET_DETOUR_LIMITS':
      return {
        ...store,
        detourLimits: action.detourLimits,
        detourLimit: action.initialDetourLimit,
      }

    case 'SET_QUIET_PATH':
      return {
        ...store,
        qPathFC: turf.asFeatureCollection(action.qPaths)
      }

    case 'SET_SELECTED_PATH': {
      // unselect path by clicking it again
      if (clickedPathAgain(store.selPathFC, action.selPathId)) {
        return {
          ...store,
          selPathFC: turf.asFeatureCollection([])
        }
      } else {
        let selPath = store.qPathFC.features.filter(feat => feat.properties.id === action.selPathId)
        // select shortest path if no quiet path id match the selected id
        if (selPath.length === 0) {
          selPath = store.sPathFC.features
        }
        return {
          ...store,
          selPathFC: turf.asFeatureCollection(selPath)
        }
      }
    }

    case 'UNSET_SELECTED_PATH':
      return {
        ...store,
        selPathFC: turf.asFeatureCollection([])
      }

    case 'SET_DETOUR_LIMIT':
      return {
        ...store,
        detourLimit: action.detourLimit
      }

    case 'ERROR_IN_ROUTING':
      return { ...store, waitingPaths: false }

    case 'SET_ORIGIN':
    case 'SET_TARGET':
    case 'WAIT_FOR_USER_LOC_ORIGIN':
    case 'SET_ORIGIN_TO_USER_LOC':
    case 'RESET_PATHS':
      return {
        ...store,
        qPathFC: turf.asFeatureCollection([]),
        sPathFC: turf.asFeatureCollection([]),
        selPathFC: turf.asFeatureCollection([]),
        detourLimit: 0,
        detourLimits: [],
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

export const getQuietPaths = (originCoords, targetCoords) => {
  return async (dispatch) => {
    dispatch({ type: 'ROUTING_STARTED' })
    let pathFeats
    try {
      pathFeats = await paths.getQuietPaths(originCoords, targetCoords)
    } catch (error) {
      dispatch({ type: 'ERROR_IN_ROUTING' })
      dispatch(showNotification("Couldn't get path", 'error', 4))
      return
    }
    const sPath = pathFeats.filter(feat => feat.properties.type === 'short')
    const qPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.len_diff !== 0)
    const qPathsSorted = qPaths.sort((a, b) => a.properties.len_diff - b.properties.len_diff)
    const detourLimits = utils.getDetourLimits(qPathsSorted)
    const initialDetourLimit = utils.getInitialDetourLimit(detourLimits)
    dispatch({ type: 'SET_DETOUR_LIMITS', detourLimits, initialDetourLimit })
    dispatch({ type: 'SET_SHORTEST_PATH', sPath })
    dispatch({ type: 'SET_QUIET_PATH', qPaths: qPathsSorted })
    const bestPath = utils.getBestPath(qPaths)
    if (bestPath) dispatch(setSelectedPath(bestPath.properties.id))
  }
}

export const setSelectedPath = (selPathId) => {
  return { type: 'SET_SELECTED_PATH', selPathId }
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
