import { turf } from '../utils/index'
import { Action } from 'redux'
import { LngLat } from 'mapbox-gl'

const initialMapState: MapReducer = {
  initialized: false,
  zoomToBbox: [0, 0, 0, 0],
  center: {},
  zoom: 0,
}

interface MapAction extends Action {
  origCoords: [number, number],
  destCoords: [number, number],
  fc: FeatureCollection,
  userLocFC: PointFeatureCollection,
  zoom: number,
  center: LngLat
}

const mapReducer = (store: MapReducer = initialMapState, action: MapAction): MapReducer => {

  switch (action.type) {

    case 'INITIALIZE_MAP':
      return { ...store, initialized: true }

    case 'ZOOM_TO_FC':
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.fc, 300)) }

    case 'ROUTING_STARTED': {
      const FC = turf.asFeatureCollection([turf.asPoint(action.origCoords), turf.asPoint(action.destCoords)])
      return { ...store, zoomToBbox: turf.getBbox(FC) }
    }

    case 'ZOOM_TO_USER_LOCATION': {
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.userLocFC, 250)) }
    }

    case 'SET_ORIGIN_TO_USER_LOC':
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.userLocFC, 400)) }

    case 'UPDATE_CAMERA':
      return { ...store, center: action.center, zoom: action.zoom }

    default:
      return store
  }
}

export const initializeMap = () => {
  return { type: 'INITIALIZE_MAP' }
}

export const zoomToFC = (fc: FeatureCollection) => {
  return { type: 'ZOOM_TO_FC', fc }
}

export const updateCamera = (center: LngLat, zoom: number) => {
  return { type: 'UPDATE_CAMERA', center, zoom }
}

export default mapReducer
