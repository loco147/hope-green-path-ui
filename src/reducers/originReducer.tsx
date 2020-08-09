import { Action } from 'redux'
import { ChangeEvent } from 'react'
import { closePopup } from './mapPopupReducer'
import { startTrackingUserLocation } from './userLocationReducer'
import * as geocoding from './../services/geocoding'

export enum LocationType {
  ADDRESS = 1,
  USER_LOCATION = 2,
  MAP_LOCATION = 3
}

export enum OdType {
  ORIGIN = 1,
  DESTINATION = 2
}

const initialOrigin: OriginReducer = {
  error: null,
  originInputText: '',
  originObject: null,
  originOptions: [],
  originOptionsVisible: false,
  waitingUserLocOrigin: false,
}

interface OdInputAction extends Action {
  originInputText: string,
  originOptions: GeocodingResult[],
  place: GeocodingResult,
  coords: [number, number]
}

const originReducer = (store: OriginReducer = initialOrigin, action: OdInputAction): OriginReducer => {

  switch (action.type) {

    case 'UPDATE_ORIGIN_INPUT_VALUE':
      return {
        ...store,
        originInputText: action.originInputText,
        originOptionsVisible: true,
        waitingUserLocOrigin: false
      }

    case 'SET_ORIGIN_OPTIONS':
      return { ...store, originOptions: action.originOptions }

    case 'HIDE_ORIGIN_OPTIONS':
      return { ...store, originOptionsVisible: false }

    case 'TOGGLE_ORIGIN_OPTIONS':
      return { ...store, originOptionsVisible: !store.originOptionsVisible }

    case 'WAIT_FOR_USER_LOC_ORIGIN':
      return { ...store, originInputText: ' ', waitingUserLocOrigin: true }

    case 'SET_GEOCODED_ORIGIN':
      return {
        ...store,
        originObject: getOriginFromGeocodingResult(action.place),
        originInputText: action.place.properties.name,
        originOptionsVisible: false
      }

    case 'SET_ORIGIN_TO_USER_LOCATION': {
      const originObject = getOriginFromUserLocation(action.coords)
      return {
        ...store,
        waitingUserLocOrigin: false,
        originObject,
        originInputText: originObject.properties.label
      }
    }

    case 'UPDATE_USER_LOCATION':
      if (store.waitingUserLocOrigin) {
        const originObject = getOriginFromUserLocation(action.coords)
        return {
          ...store,
          waitingUserLocOrigin: false,
          originObject,
          originInputText: originObject.properties.label
        }
      } else {
        return store
      }

    case 'RESET_ORIGIN_INPUT':
      return initialOrigin

    default:
      return store
  }
}

const showingCoordinates = (inputText: string): boolean => {
  const numberCount = inputText.replace(/[^0-9]/g, '').length
  return numberCount > Math.round(inputText.length / 2)
}

export const setOriginInputText = (event: ChangeEvent<HTMLInputElement>) => {
  return async (dispatch: any) => {
    const originInputText = event.target ? event.target.value : ''
    dispatch({ type: 'UPDATE_ORIGIN_INPUT_VALUE', originInputText })
    if (originInputText.length > 2 && !showingCoordinates(originInputText)) {
      const originOptions = await geocoding.geocodeAddress(originInputText)
      dispatch({ type: 'SET_ORIGIN_OPTIONS', originOptions })
    } else {
      dispatch({ type: 'SET_ORIGIN_OPTIONS', originOptions: [] })
    }
  }
}

export const setGeocodedOrigin = (place: GeocodingResult) => {
  return { type: 'SET_GEOCODED_ORIGIN', place }
}

export const hideOriginOptions = () => {
  return { type: 'HIDE_ORIGIN_OPTIONS' }
}

export const resetOriginInput = () => {
  return { type: 'RESET_ORIGIN_INPUT' }
}

export const toggleOriginOptionsVisible = () => {
  return { type: 'TOGGLE_ORIGIN_OPTIONS' }
}

export const useUserLocationOrigin = (e: any, userLocation: UserLocationReducer) => {
  e.stopPropagation()
  return async (dispatch: any) => {
    dispatch({ type: 'RESET_ORIGIN_INPUT' })
    dispatch({ type: 'RESET_PATHS' })
    closePopup()
    const lngLat = userLocation.lngLat
    if (lngLat) {
      dispatch({
        type: 'SET_ORIGIN_TO_USER_LOCATION',
        coords: [lngLat.lat, lngLat.lng]
      })
    } else {
      dispatch({ type: 'WAIT_FOR_USER_LOC_ORIGIN' })
      dispatch(startTrackingUserLocation())
    }
  }
}

const getOriginFromGeocodingResult = (place: GeocodingResult): OdPlace => {
  return { ...place, properties: { ...place.properties, locationType: LocationType.ADDRESS, odType: OdType.ORIGIN } }
}

const roundCoords = (coord: number) => {
  return Math.round(coord * 10000) / 10000
}

const getOriginFromUserLocation = (coordinates: [number, number]): OdPlace => {
  const label = String(roundCoords(coordinates[0])) + ' ' + String(roundCoords(coordinates[1]))
  return {
    geometry: {
      type: 'Point',
      coordinates
    },
    properties: {
      label,
      locationType: LocationType.USER_LOCATION,
      odType: OdType.ORIGIN
    }
  }
}

export default originReducer