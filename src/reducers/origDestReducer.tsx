import { turf } from '../utils/index'
import { initialOrigDestFeatures } from './../constants'
import { closePopup } from './mapPopupReducer'
import { startTrackingUserLocation } from './userLocationReducer'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'

const initialOrigDest = {
  origDestFC: turf.asFeatureCollection(process.env.NODE_ENV !== 'production' ? initialOrigDestFeatures : []),
  useUserLocOrigin: false,
  waitUserLocOrigin: false,
  error: null,
  showingPaths: false,
}

const pathsReducer = (store = initialOrigDest, action) => {

  switch (action.type) {

    case 'RESET_ORIGIN_DEST':
      return initialOrigDest

    case 'RESET_ORIGIN': {
      const featsNoOrig = store.origDestFC.features.filter(feat => feat.properties.type !== 'orig')
      return {
        ...store,
        useUserLocOrigin: false,
        waitUserLocOrigin: false,
        origDestFC: turf.asFeatureCollection(featsNoOrig)
      }
    }

    case 'RESET_DEST': {
      const featsNoDest = store.origDestFC.features.filter(feat => feat.properties.type !== 'dest')
      return { ...store, origDestFC: turf.asFeatureCollection(featsNoDest) }
    }

    case 'SET_ORIGIN': {
      const error = utils.origDestWithinSupportedArea(action.updateOrigDestFC)
      return {
        ...store,
        origDestFC: action.updateOrigDestFC,
        error: error ? error : null,
        useUserLocOrigin: false,
        waitUserLocOrigin: false
      }
    }

    case 'SET_ORIGIN_TO_USER_LOC': {
      const origDestFC = updateOriginToFC(store.origDestFC, action.userLngLat)
      return {
        ...store,
        origDestFC,
        useUserLocOrigin: true,
        waitUserLocOrigin: false
      }
    }

    case 'WAIT_FOR_USER_LOC_ORIGIN': {
      const onlyDestFeat = store.origDestFC.features.filter(feat => feat.properties.type === 'dest')
      return {
        ...store,
        useUserLocOrigin: true,
        waitUserLocOrigin: true,
        origDestFC: turf.asFeatureCollection(onlyDestFeat)
      }
    }

    case 'UPDATE_USER_LOCATION': {
      if (store.useUserLocOrigin && store.waitUserLocOrigin) {
        const updateOrigDestFC = updateOriginToFC(store.origDestFC, turf.toLngLat(action.coords))
        const error = utils.origDestWithinSupportedArea(updateOrigDestFC)
        return {
          ...store,
          origDestFC: updateOrigDestFC,
          error: error ? error : null,
          waitUserLocOrigin: false
        }
      } else return store
    }

    case 'SET_TARGET': {
      const error = utils.origDestWithinSupportedArea(action.updateOrigDestFC)
      return { ...store, origDestFC: action.updateOrigDestFC, error: error ? error : null }
    }

    case 'SET_SHORTEST_PATH': return { ...store, showingPaths: true }

    case 'RESET_PATHS': {
      if (action.lngLat && store.useUserLocOrigin) {
        console.log('update origin to current user location:', action.lngLat)
        const updateOrigDestFC = updateOriginToFC(store.origDestFC, action.lngLat)
        const error = utils.origDestWithinSupportedArea(updateOrigDestFC)
        return { ...store, showingPaths: false, origDestFC: updateOrigDestFC, error: error ? error : null }
      }
      else return { ...store, showingPaths: false }
    }

    default:
      return store
  }
}

export const resetOrig = () => {
  return { type: 'RESET_ORIGIN' }
}

export const resetDest = () => {
  return { type: 'RESET_DEST' }
}

export const showSetDestinationTooltip = () => {
  return async (dispatch) => {
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 8))
  }
}

export const setOrigin = (lngLat, origDestFC) => {
  return async (dispatch) => {
    const updateOrigDestFC = updateOriginToFC(origDestFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_ORIGIN', updateOrigDestFC })
    dispatch(closePopup())
  }
}

export const setDest = (lngLat, origDestFC, routingId) => {
  return async (dispatch) => {
    const updateOrigDestFC = updateDestToFC(origDestFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_TARGET', updateOrigDestFC })
    dispatch(closePopup())
  }
}

export const useUserLocationOrigin = (userLocation) => {
  return async (dispatch) => {
    const userLngLat = turf.getLngLatFromFC(userLocation.userLocFC)
    dispatch({ type: 'RESET_PATHS' })
    dispatch(closePopup())
    if (userLngLat) {
      dispatch({ type: 'SET_ORIGIN_TO_USER_LOC', userLngLat, userLocFC: userLocation.userLocFC })
    } else {
      dispatch({ type: 'WAIT_FOR_USER_LOC_ORIGIN' })
      dispatch(startTrackingUserLocation())
    }
  }
}

const updateOriginToFC = (FC, lngLat) => {
  const features = FC.features
  const dest = features.filter(feat => feat.properties.type === 'dest')
  const coords = [lngLat.lng, lngLat.lat]
  const orig = [turf.asPoint(coords, { type: 'orig' })]
  return turf.asFeatureCollection(orig.concat(dest))
}

const updateDestToFC = (FC, lngLat) => {
  const features = FC.features
  const orig = features.filter(feat => feat.properties.type === 'orig')
  const coords = [lngLat.lng, lngLat.lat]
  const dest = [turf.asPoint(coords, { type: 'dest' })]
  return turf.asFeatureCollection(dest.concat(orig))
}

export default pathsReducer
