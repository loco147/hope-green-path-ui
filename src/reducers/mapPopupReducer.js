
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

const initialMapPopups = { visible: false }
let mbPopup
let mapRef

const mapPopupReducer = (store = initialMapPopups, action) => {

  switch (action.type) {

    case 'SET_POPUP':
      return { ...store, visible: true }

    case 'SET_POPUP_LNGLAT':
      return { ...store, lngLat: action.lngLat }

    case 'CLOSE_POPUP':
      return initialMapPopups

    default:
      return store
  }
}

export const setSelectLocationsPopup = (lngLat, offset) => {
  return async (dispatch) => {
    if (mbPopup) {
      mbPopup.remove()
      dispatch({ type: 'CLOSE_POPUP' })
    }
    dispatch({ type: 'SET_POPUP_LNGLAT', lngLat })

    mbPopup = new MapboxGl.Popup({ closeOnClick: true, closeButton: true, offset: offset, anchor: 'bottom' })

    mbPopup
      .setLngLat(lngLat)
      .setHTML('<div id="popup" </div>')
      .addTo(mapRef)

    dispatch({ type: 'SET_POPUP' })
  }
}

export const closePopup = () => {
  return async (dispatch) => {
    if (mbPopup) mbPopup.remove()
  }
}

export const setMapReferenceForPopups = (map) => {
  if (!mapRef) mapRef = map
}

export default mapPopupReducer
