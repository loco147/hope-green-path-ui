import { turf } from '../utils/index'
import * as paths from './../services/paths'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'

const initialPaths = {
  cleanPathsAvailable: false,
  showingPathsType: null,
  selPathFC: turf.asFeatureCollection([]),
  shortPathFC: turf.asFeatureCollection([]),
  quietPathFC: turf.asFeatureCollection([]),
  cleanPathFC: turf.asFeatureCollection([]),
  quietEdgeFC: turf.asFeatureCollection([]),
  cleanEdgeFC: turf.asFeatureCollection([]),
  openedPath: null,
  lengthLimit: { limit: 0, count: 0, label: '' },
  lengthLimits: [],
  waitingPaths: false,
  showingPaths: false,
  routingId: 0,
}

const pathsReducer = (store = initialPaths, action) => {

  switch (action.type) {

    case 'SET_AQI_STATUS':
      return {
        ...store,
        cleanPathsAvailable: action.b_available
      }

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
        shortPathFC: turf.asFeatureCollection(action.shortPath),
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

    case 'SET_QUIET_PATHS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        showingPathsType: 'quiet',
        quietPathFC: turf.asFeatureCollection(action.quietPaths),
      }
    }

    case 'SET_CLEAN_PATHS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        showingPathsType: 'clean',
        cleanPathFC: turf.asFeatureCollection(action.cleanPaths),
      }
    }

    case 'SET_EDGE_FC': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        quietEdgeFC: action.quietEdgeFC ? action.quietEdgeFC : store.quietEdgeFC,
        cleanEdgeFC: action.cleanEdgeFC ? action.cleanEdgeFC : store.cleanEdgeFC,
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
        let selPath = store.quietPathFC.features.filter(feat => feat.properties.id === action.selPathId)
        if (selPath.length === 0) {
          selPath = store.shortPathFC.features
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
        cleanPathsAvailable: store.cleanPathsAvailable,
        showingPathsType: null,
        showingPaths: false,
        routingId: store.routingId + 1,
      }

    default:
      return store
  }
}

export const testGreenPathServiceConnection = () => {
  return async (dispatch) => {
    const startTime = performance.now()
    try {
      const connTestResponse = await paths.getConnectionTestResponse()
      const tookTime = Math.round(performance.now() - startTime)
      console.log('connection to gp service ok, response:', connTestResponse, 'took:', tookTime, 'ms')
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

export const testCleanPathServiceStatus = () => {
  return async (dispatch) => {
    try {
      const aqiStatus = await paths.getCleanPathServiceStatus()
      console.log('received clean path service status:', aqiStatus)
      dispatch({ type: 'SET_AQI_STATUS', b_available: aqiStatus.b_updated })
    } catch (error) {
      dispatch({ type: 'SET_AQI_STATUS', b_available: false })
      console.log('error in retrieving clean path service status:', error)
    }
  }
}

const confirmLongDistance = (origCoords, destCoords) => {
  const distance = turf.getDistance(origCoords, destCoords)
  if (distance > 5200) {
    if (!window.confirm('Long distance routing may take longer than 10 s')) {
      return false
    }
  }
  return true
}

export const getQuietPaths = (origCoords, destCoords, prevRoutingId) => {
  return async (dispatch) => {
    if (!confirmLongDistance(origCoords, destCoords)) {
      return
    }
    const routingId = prevRoutingId + 1
    dispatch({ type: 'ROUTING_STARTED', origCoords, destCoords, routingId })
    try {
      const pathData = await paths.getQuietPaths(origCoords, destCoords)
      const pathFeats = pathData.path_FC.features
      const shortPath = pathFeats.filter(feat => feat.properties.type === 'short')
      const quietPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.len_diff !== 0)
      const lengthLimits = utils.getLengthLimits(pathFeats)
      const initialLengthLimit = utils.getInitialLengthLimit(lengthLimits)
      dispatch({ type: 'SET_LENGTH_LIMITS', lengthLimits, initialLengthLimit, routingId })
      dispatch({ type: 'SET_SHORTEST_PATH', shortPath, routingId })
      dispatch({ type: 'SET_QUIET_PATHS', quietPaths: quietPaths, routingId })
      dispatch({ type: 'SET_EDGE_FC', quietEdgeFC: pathData.edge_FC, routingId })
      const bestPath = utils.getBestPath(quietPaths)
      if (bestPath) {
        dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
      } else if (quietPaths.length > 0) {
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

export const getCleanPaths = (origCoords, destCoords, prevRoutingId) => {
  return async (dispatch) => {
    if (!confirmLongDistance(origCoords, destCoords)) {
      return
    }
    const routingId = prevRoutingId + 1
    dispatch({ type: 'ROUTING_STARTED', origCoords, destCoords, routingId })
    try {
      const pathData = await paths.getCleanPaths(origCoords, destCoords)
      const pathFeats = pathData.path_FC.features
      const shortPath = pathFeats.filter(feat => feat.properties.type === 'short')
      const cleanPaths = pathFeats.filter(feat => feat.properties.type === 'clean' && feat.properties.len_diff !== 0)
      const lengthLimits = utils.getLengthLimits(pathFeats)
      const initialLengthLimit = utils.getInitialLengthLimit(lengthLimits)
      dispatch({ type: 'SET_LENGTH_LIMITS', lengthLimits, initialLengthLimit, routingId })
      dispatch({ type: 'SET_SHORTEST_PATH', shortPath, routingId })
      dispatch({ type: 'SET_CLEAN_PATHS', cleanPaths: cleanPaths, routingId })
      dispatch({ type: 'SET_EDGE_FC', cleanEdgeFC: pathData.edge_FC, routingId })
      const bestPath = utils.getBestPath(cleanPaths)
      if (bestPath) {
        dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
      } else if (cleanPaths.length > 0) {
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
    if (process.env.NODE_ENV === 'production') {
      dispatch({ type: 'RESET_ORIGIN_TARGET' })
    }
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 6))
  }
}

const clickedPathAgain = (storeSelPathFC, clickedPathId) => {
  return storeSelPathFC.features[0] && clickedPathId === storeSelPathFC.features[0].properties.id
}

export default pathsReducer
