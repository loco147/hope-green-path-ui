import hmaPoly from './../HMA.json'
import { turf } from '../utils/index'
import { initialOrigDestFeatures } from './../constants'
import { closePopup } from './mapPopupReducer'
import { startTrackingUserLocation } from './userLocationReducer'
import { showNotification } from './notificationReducer'
import { Action } from 'redux'

const origDestWithinSupportedArea = (origDestFC: PointFeatureCollection) => {
  const origin = origDestFC.features.filter(feat => feat.properties.type === 'orig')
  const dest = origDestFC.features.filter(feat => feat.properties.type === 'dest')
  // @ts-ignore
  const extentFeat: PolygonFeature = hmaPoly.features[0]
  if (origin.length > 0 && !turf.within(origin[0], extentFeat)) {
    return 'Origin is outside the supported area'
  }
  if (dest.length > 0 && !turf.within(dest[0], extentFeat)) {
    return 'Destination is outside the supported area'
  }
  return null
}

const initialOrigDest: OrigDestReducer = {
  // @ts-ignore
  origDestFC: turf.asPointFeatureCollection(process.env.NODE_ENV !== 'production' ? initialOrigDestFeatures : []),
  useUserLocOrigin: false,
  waitUserLocOrigin: false,
  error: null,
  showingPaths: false,
}

interface PathAction extends Action {
  lngLat: LngLat,
  userLngLat: LngLat,
  updateOrigDestFC: PointFeatureCollection,
  coords: [number, number]
} 

const pathsReducer = (store: OrigDestReducer = initialOrigDest, action: PathAction) => {

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
      const error = origDestWithinSupportedArea(action.updateOrigDestFC)
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
        const error = origDestWithinSupportedArea(updateOrigDestFC)
        return {
          ...store,
          origDestFC: updateOrigDestFC,
          error: error ? error : null,
          waitUserLocOrigin: false
        }
      } else return store
    }

    case 'SET_TARGET': {
      const error = origDestWithinSupportedArea(action.updateOrigDestFC)
      return { ...store, origDestFC: action.updateOrigDestFC, error: error ? error : null }
    }

    case 'SET_SHORTEST_PATH': return { ...store, showingPaths: true }

    case 'RESET_PATHS': {
      if (action.lngLat && store.useUserLocOrigin) {
        console.log('update origin to current user location:', action.lngLat)
        const updateOrigDestFC = updateOriginToFC(store.origDestFC, action.lngLat)
        const error = origDestWithinSupportedArea(updateOrigDestFC)
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
  return async (dispatch: any) => {
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 8))
  }
}

export const setOrigin = (lngLat: LngLat, origDestFC: PointFeatureCollection) => {
  return async (dispatch: any) => {
    const updateOrigDestFC = updateOriginToFC(origDestFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_ORIGIN', updateOrigDestFC })
    closePopup()
  }
}

export const setDest = (lngLat: LngLat, origDestFC: PointFeatureCollection) => {
  return async (dispatch: any) => {
    const updateOrigDestFC = updateDestToFC(origDestFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_TARGET', updateOrigDestFC })
    closePopup()
  }
}

export const useUserLocationOrigin = (userLocation: UserLocationReducer) => {
  return async (dispatch: any) => {
    const userLngLat = turf.getLngLatFromFC(userLocation.userLocFC)
    dispatch({ type: 'RESET_PATHS' })
    closePopup()
    if (userLngLat) {
      dispatch({ type: 'SET_ORIGIN_TO_USER_LOC', userLngLat, userLocFC: userLocation.userLocFC })
    } else {
      dispatch({ type: 'WAIT_FOR_USER_LOC_ORIGIN' })
      dispatch(startTrackingUserLocation())
    }
  }
}

const updateOriginToFC = (FC: PointFeatureCollection, lngLat: LngLat) => {
  const features = FC.features
  const dest = features.filter(feat => feat.properties.type === 'dest')
  const coords: [number, number] = [lngLat.lng, lngLat.lat]
  const orig = [turf.asPoint(coords, { type: 'orig' })]
  return turf.asPointFeatureCollection(orig.concat(dest))
}

const updateDestToFC = (FC: PointFeatureCollection, lngLat: LngLat) => {
  const features: PointFeature[] = FC.features
  const orig = features.filter(feat => feat.properties.type === 'orig')
  const coords: [number, number] = [lngLat.lng, lngLat.lat]
  const dest: PointFeature[] = [turf.asPoint(coords, { type: 'dest' })]
  return turf.asFeatureCollection(dest.concat(orig))
}

export default pathsReducer
