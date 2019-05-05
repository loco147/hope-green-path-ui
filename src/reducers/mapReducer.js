import { turf } from '../utils/index'

const initialMapState = {
  initialized: false,
  zoomToBbox: [],
  center: {},
  zoom: 0,
  mouseOnFeature: null,
}

const mapReducer = (store = initialMapState, action) => {

  switch (action.type) {

    case 'INITIALIZE_MAP':
      return { ...store, initialized: true }

    case 'ROUTING_STARTED': {
      const FC = turf.asFeatureCollection([turf.asPoint(action.originCoords), turf.asPoint(action.targetCoords)])
      return { ...store, zoomToBbox: turf.getBbox(FC) }
    }

    case 'SET_ORIGIN_TO_USER_LOC':
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.userLocFC, 700)) }

    case 'UPDATE_CAMERA':
      return { ...store, center: action.center, zoom: action.zoom }

    default:
      return store
  }
}

export const initializeMap = () => {
  return { type: 'INITIALIZE_MAP' }
}

export const zoomToFeature = (feature) => {
  return { type: 'ZOOM_TO_FEATURE', feature }
}

export const updateCamera = (center, zoom) => {
  return { type: 'UPDATE_CAMERA', center, zoom }
}

export default mapReducer
