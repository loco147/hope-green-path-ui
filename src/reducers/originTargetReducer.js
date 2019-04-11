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

export const setOrigin = (originlngLat) => {
  console.log('SET_ORIGIN', originlngLat)
  return ({ type: 'SET_ORIGIN', originlngLat })
}

export const setTarget = (targetlngLat) => {
  console.log('SET_TARGET', targetlngLat)
  return ({ type: 'SET_TARGET', targetlngLat })
}

export default pathsReducer
