import { turf } from '../utils/index'
import { initialOriginTargetFeatures } from './../constants'
import { closePopup } from './mapPopupReducer'

const initialOriginTarget = {
  originTargetFC: turf.asFeatureCollection(initialOriginTargetFeatures),
}

const pathsReducer = (store = initialOriginTarget, action) => {

  switch (action.type) {

    case 'RESET_ORIGIN_TARGET':
      return initialOriginTarget

    case 'SET_ORIGIN': {
      const originTargetFC = updateOriginToFC(store.originTargetFC, action.lngLat)
      return { ...store, originTargetFC }
    }

    case 'SET_TARGET': {
      const originTargetFC = updateTargetToFC(store.originTargetFC, action.lngLat)
      return { ...store, originTargetFC }
    }

    default:
      return store
  }
}

export const setOrigin = (lngLat) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_ORIGIN', lngLat })
    dispatch(closePopup())
  }
}

export const setTarget = (lngLat) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_TARGET', lngLat })
    dispatch(closePopup())
  }
}

const updateOriginToFC = (FC, lngLat) => {
  const features = FC.features
  const target = features.filter(feat => feat.properties.type === 'target')
  const coords = [lngLat.lng, lngLat.lat]
  const origin = [turf.asPoint(coords, { type: 'origin' })]
  return turf.asFeatureCollection(origin.concat(target))
}

const updateTargetToFC = (FC, lngLat) => {
  const features = FC.features
  const origin = features.filter(feat => feat.properties.type === 'origin')
  const coords = [lngLat.lng, lngLat.lat]
  const target = [turf.asPoint(coords, { type: 'target' })]
  return turf.asFeatureCollection(target.concat(origin))
}

export default pathsReducer
