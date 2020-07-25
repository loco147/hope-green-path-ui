import { turf } from '../utils/index'
import * as paths from './../services/paths'
import { showNotification } from './notificationReducer'
import { RoutingMode, PathType, TravelMode, statTypes } from './../constants'
import { utils } from './../utils/index'
import { Action } from 'redux'

const initialPaths: PathsReducer = {
  cleanPathsAvailable: false,
  travelMode: TravelMode.WALK,
  showingPathsType: null,
  showingStatsType: null,
  quietPathData: null,
  cleanPathData: null,
  selPathFC: { type: 'FeatureCollection', features: [] },
  shortPathFC: { type: 'FeatureCollection', features: [] },
  quietPathFC: { type: 'FeatureCollection', features: [] },
  cleanPathFC: { type: 'FeatureCollection', features: [] },
  quietEdgeFC: { type: 'FeatureCollection', features: [] },
  cleanEdgeFC: { type: 'FeatureCollection', features: [] },
  openedPath: null,
  lengthLimit: { limit: 0, count: 0, label: '', cost_coeff: 0 },
  lengthLimits: [],
  waitingPaths: false,
  showingPaths: false,
  routingId: 0,
}

interface PathsAction extends Action {
  travelMode: TravelMode,
  b_available: boolean,
  routingId: number,
  shortPath: PathFeature[],
  lengthLimit: LengthLimit,
  lengthLimits: LengthLimit[],
  initialLengthLimit: LengthLimit,
  origCoords: [number, number],
  destCoords: [number, number],
  pathData: PathDataResponse,
  quietPaths: PathFeature[],
  cleanPaths: PathFeature[],
  quietEdgeFC: EdgeFeatureCollection,
  cleanEdgeFC: EdgeFeatureCollection,
  selPathId: string,
  selPath: PathFeature,
  path: PathFeature
}

const pathsReducer = (store = initialPaths, action: PathsAction) => {

  switch (action.type) {

    case 'SET_AQI_STATUS':
      return {
        ...store,
        cleanPathsAvailable: action.b_available
      }

    case 'SET_TRAVEL_MODE':
      return {
        ...store,
        travelMode: action.travelMode
      }

    case 'ROUTING_STARTED':
      return {
        ...store,
        waitingPaths: true,
        routingId: action.routingId,
        travelMode: action.travelMode
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

    case 'SET_QUIET_PATH_DATA': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        quietPathData: {
          od: [action.origCoords, action.destCoords],
          data: action.pathData,
          travelMode: action.travelMode
        },
      }
    }

    case 'SET_QUIET_PATHS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        showingPathsType: RoutingMode.QUIET,
        showingStatsType: statTypes.noise,
        quietPathFC: turf.asFeatureCollection(action.quietPaths),
      }
    }

    case 'SET_CLEAN_PATH_DATA': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        cleanPathData: {
          od: [action.origCoords, action.destCoords],
          data: action.pathData,
          travelMode: action.travelMode
        },
      }
    }

    case 'SET_CLEAN_PATHS': {
      const cancelledRouting = store.routingId !== action.routingId
      if (cancelledRouting) return store
      return {
        ...store,
        showingPathsType: RoutingMode.CLEAN,
        showingStatsType: statTypes.aq,
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
        let selPath: PathFeature[]
        if (action.selPathId === PathType.SHORT) {
          selPath = store.shortPathFC.features
        } else if (store.showingPathsType === RoutingMode.QUIET) {
          selPath = store.quietPathFC.features.filter(feat => feat.properties!.id === action.selPathId)
        } else if (store.showingPathsType === RoutingMode.CLEAN) {
          selPath = store.cleanPathFC.features.filter(feat => feat.properties!.id === action.selPathId)
        }
        console.log('selecting path:', selPath! ? selPath![0].properties : 'no selection')
        return {
          ...store,
          // if openedPath is set, change it to the selected path
          openedPath: store.openedPath ? (selPath! ? selPath![0] : null) : null,
          selPathFC: turf.asFeatureCollection(selPath!),
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

    case 'CLOSE_PATHS': {
      return {
        ...store,
        selPathFC: turf.asFeatureCollection([]),
        openedPath: null,
      }
    }

    case 'RESET_PATHS':
      return {
        ...initialPaths,
        cleanPathsAvailable: store.cleanPathsAvailable,
        travelMode: store.travelMode,
        showingPathsType: null,
        showingPaths: false,
        routingId: store.routingId + 1,
      }

    default:
      return store
  }
}

export const testGreenPathServiceConnection = () => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    try {
      const aqiStatus = await paths.getCleanPathServiceStatus()
      console.log('received clean path service status:', aqiStatus)
      console.log('real-time aqi available?', aqiStatus.b_updated)
      dispatch({ type: 'SET_AQI_STATUS', b_available: aqiStatus.b_updated })
      if (aqiStatus.b_updated === false) {
        dispatch(showNotification('Unfortunately, no real-time air quality data is available at the moment', 'error', 10))
      }
    } catch (error) {
      dispatch({ type: 'SET_AQI_STATUS', b_available: false })
      console.log('error in retrieving clean path service status:', error)
    }
  }
}

const confirmLongDistance = (origCoords: [number, number], destCoords: [number, number]) => {
  const distance = turf.getDistance(origCoords, destCoords)
  if (distance > 5200) {
    if (!window.confirm('Long distance routing may take longer than 10 s')) {
      return false
    }
  }
  return true
}

export const setTravelMode = (travelMode: TravelMode) => {
  return async (dispatch: any) => {
    dispatch({ type: 'SET_TRAVEL_MODE', travelMode })
  }
}

export const getSetQuietPaths = (origCoords: [number, number], destCoords: [number, number], travelMode: TravelMode, prevRoutingId: number) => {
  return async (dispatch: any) => {
    if (!confirmLongDistance(origCoords, destCoords)) {
      return
    }
    const routingId = prevRoutingId + 1
    dispatch({ type: 'CLOSE_PATHS' })
    dispatch({ type: 'ROUTING_STARTED', origCoords, destCoords, routingId, travelMode })
    try {
      const pathData = await paths.getQuietPaths(travelMode, origCoords, destCoords)
      dispatch(setQuietPaths(origCoords, destCoords, routingId, pathData, travelMode))
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

export const setQuietPaths = (origCoords: [number, number], destCoords: [number, number], routingId: number, pathData: PathDataResponse, travelMode: TravelMode) => {
  return async (dispatch: any) => {
    dispatch({ type: 'CLOSE_PATHS' })
    dispatch({ type: 'SET_QUIET_PATH_DATA', routingId, origCoords, destCoords, pathData, travelMode })
    const pathFeats: PathFeature[] = pathData.path_FC.features
    const shortPath = pathFeats.filter(feat => feat.properties.type === 'short')
    const quietPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.len_diff !== 0)
    const lengthLimits = utils.getLengthLimits(pathFeats)
    const initialLengthLimit = utils.getInitialLengthLimit(lengthLimits, quietPaths.length)
    dispatch({ type: 'SET_LENGTH_LIMITS', lengthLimits, initialLengthLimit, routingId })
    dispatch({ type: 'SET_SHORTEST_PATH', shortPath, routingId })
    dispatch({ type: 'SET_QUIET_PATHS', quietPaths: quietPaths, routingId })
    dispatch({ type: 'SET_EDGE_FC', quietEdgeFC: pathData.edge_FC, routingId })
    const bestPath = utils.getBestPath(quietPaths)
    if (bestPath) {
      dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
    } else if (quietPaths.length > 0) {
      dispatch({ type: 'SET_SELECTED_PATH', selPathId: 'short', routingId })
    }
    if (quietPaths.length === 0) {
      dispatch(showNotification('No alternative quiet paths found', 'info', 5))
    }
  }
}

export const getSetCleanPaths = (origCoords: [number, number], destCoords: [number, number], travelMode: TravelMode, prevRoutingId: number) => {
  return async (dispatch: any) => {
    if (!confirmLongDistance(origCoords, destCoords)) {
      return
    }
    const routingId = prevRoutingId + 1
    dispatch({ type: 'CLOSE_PATHS' })
    dispatch({ type: 'ROUTING_STARTED', origCoords, destCoords, routingId, travelMode })
    try {
      const pathData = await paths.getCleanPaths(travelMode, origCoords, destCoords)
      dispatch(setCleanPaths(origCoords, destCoords, routingId, pathData, travelMode))
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

export const setCleanPaths = (origCoords: [number, number], destCoords: [number, number], routingId: number, pathData: PathDataResponse, travelMode: TravelMode) => {
  return async (dispatch: any) => {
    dispatch({ type: 'CLOSE_PATHS' })
    dispatch({ type: 'SET_CLEAN_PATH_DATA', routingId, origCoords, destCoords, pathData, travelMode })
    const pathFeats: PathFeature[] = pathData.path_FC.features
    const shortPath = pathFeats.filter(feat => feat.properties.type === 'short')
    const cleanPaths = pathFeats.filter(feat => feat.properties.type === 'clean' && feat.properties.len_diff !== 0)
    const lengthLimits = utils.getLengthLimits(pathFeats)
    const initialLengthLimit = lengthLimits[lengthLimits.length - 1]
    dispatch({ type: 'SET_LENGTH_LIMITS', lengthLimits, initialLengthLimit, routingId })
    dispatch({ type: 'SET_SHORTEST_PATH', shortPath, routingId })
    dispatch({ type: 'SET_CLEAN_PATHS', cleanPaths: cleanPaths, routingId })
    dispatch({ type: 'SET_EDGE_FC', cleanEdgeFC: pathData.edge_FC, routingId })
    const bestPath = utils.getBestPath(cleanPaths)
    if (bestPath) {
      dispatch({ type: 'SET_SELECTED_PATH', selPathId: bestPath.properties.id, routingId })
    } else if (cleanPaths.length > 0) {
      dispatch({ type: 'SET_SELECTED_PATH', selPathId: 'short', routingId })
    }
    if (cleanPaths.length === 0) {
      dispatch(showNotification('No alternative fresh air paths found due to little or no variation in the real-time air quality data', 'info', 10))
    }
  }
}

export const setSelectedPath = (selPathId: string) => {
  return { type: 'SET_SELECTED_PATH', selPathId }
}

export const setOpenedPath = (path: PathFeature) => {
  return { type: 'SET_OPENED_PATH', path }
}

export const unsetOpenedPath = () => {
  return { type: 'UNSET_OPENED_PATH' }
}

export const setLengthLimit = (lengthLimit: number) => {
  return { type: 'SET_LENGTH_LIMIT', lengthLimit }
}

export const unsetSelectedPath = () => {
  return { type: 'UNSET_SELECTED_PATH' }
}

export const resetPaths = (lngLat: LngLat | null) => {
  return async (dispatch: any) => {
    dispatch({ type: 'RESET_PATHS', lngLat })
    if (process.env.NODE_ENV === 'production') {
      dispatch({ type: 'RESET_ORIGIN_DEST' })
    }
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 6))
  }
}

const clickedPathAgain = (storeSelPathFC: PathFeatureCollection, clickedPathId: string) => {
  return storeSelPathFC.features[0] && clickedPathId === storeSelPathFC.features[0].properties.id
}

export default pathsReducer
