import { turf } from '../utils/index'
import { initialOriginTargetFeatures } from './../constants'

const initialOriginTarget = {
  originTargetFC: turf.asFeatureCollection(initialOriginTargetFeatures),
}

const pathsReducer = (store = initialOriginTarget, action) => {

  switch (action.type) {
    case 'SET_ORIGIN_TARGET':
      return {
        ...store,
        originTargetFC: turf.asFeatureCollection([action.originTarget])
      }

    case 'RESET_ORIGIN_TARGET':
      return initialOriginTarget

    default:
      return store
  }
}

export const setOrigin = (originLatLon) => {
  console.log('SET_ORIGIN', originLatLon)
  return ({ type: 'SET_ORIGIN', originLatLon })
}

export const setTarget = (targetLatLon) => {
  console.log('SET_TARGET', targetLatLon)
  return ({ type: 'SET_TARGET', targetLatLon })
}

export default pathsReducer
