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
