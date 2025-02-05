import { turf } from '../utils/index'
import { Action } from 'redux'
import { LngLat } from 'mapbox-gl'
import { Basemap, LayerId } from '../constants'

const initialMapState: MapReducer = {
  initialized: false,
  zoomToBbox: [0, 0, 0, 0],
  basemap: Basemap.STREETS,
  basemapChangeId: 1,
  loadedLayers: [],
  center: {},
  zoom: 0,
}

interface MapAction extends Action {
  originCoords: [number, number],
  destCoords: [number, number],
  fc: FeatureCollection,
  userLocFC: PointFeatureCollection,
  originObject: OdPlace,
  zoom: number,
  center: LngLat,
  basemap: Basemap,
  layerId: LayerId
}

const mapReducer = (store: MapReducer = initialMapState, action: MapAction): MapReducer => {

  switch (action.type) {

    case 'INITIALIZE_MAP':
      return { ...store, initialized: true }

    case 'ZOOM_TO_FC':
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.fc, 300)) }

    case 'ROUTING_STARTED': {
      const FC = turf.asFeatureCollection([turf.asPoint(action.originCoords), turf.asPoint(action.destCoords)])
      return { ...store, zoomToBbox: turf.getBbox(FC) }
    }

    case 'ZOOM_TO_USER_LOCATION': {
      return { ...store, zoomToBbox: turf.getBbox(turf.getBuffer(action.userLocFC, 250)) }
    }

    case 'SET_BASEMAP': {
      return { ...store, basemap: action.basemap }
    }

    case 'BASEMAP_CHANGED': {
      return { ...store, basemapChangeId: store.basemapChangeId + 1 }
    }

    case 'LAYER_LOADED': {
      const loadedLayers = store.loadedLayers.includes(action.layerId)
        ? store.loadedLayers
        : store.loadedLayers.concat(action.layerId)
      return { ...store, loadedLayers }
    }

    case 'UNLOAD_LAYERS': {
      return { ...store, loadedLayers: [] }
    }

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

export const setBaseMap = (basemap: Basemap) => {
  return { type: 'SET_BASEMAP', basemap }
}

export const setBaseMapChanged = () => {
  return { type: 'BASEMAP_CHANGED' }
}

export const setLayerLoaded = (layerId: LayerId) => {
  return { type: 'LAYER_LOADED', layerId }
}

export const unloadLayers = () => {
  return { type: 'UNLOAD_LAYERS' }
}

export default mapReducer
