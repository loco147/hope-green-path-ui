import { Action } from 'redux'
import { ChangeEvent } from 'react'
import { closePopup } from './mapPopupReducer'
import { startTrackingUserLocation } from './userLocationReducer'
import * as geocoding from './../services/geocoding'

export enum LocationType {
  ADDRESS = 1,
  USER_LOCATION = 2
}

export enum OdType {
  ORIGIN = 1,
  DESTINATION = 2
}

const initialOrig: OriginReducer = {
  origInputText: '',
  origObject: null,
  origOptions: [],
  origOptionsVisible: false,
  waitingUserLocOrigin: false,
}

interface OdInputAction extends Action {
  origInputText: string,
  origOptions: GeocodingResult[],
  place: GeocodingResult,
  coords: [number, number]
}

const origDestInputReducer = (store: OriginReducer = initialOrig, action: OdInputAction): OriginReducer => {

  switch (action.type) {

    case 'UPDATE_ORIG_INPUT_VALUE':
      return {
        ...store,
        origInputText: action.origInputText,
        origOptionsVisible: true,
        waitingUserLocOrigin: false
      }

    case 'SET_ORIGIN_OPTIONS':
      return { ...store, origOptions: action.origOptions }

    case 'HIDE_ORIGIN_OPTIONS':
      return { ...store, origOptionsVisible: false }

    case 'TOGGLE_ORIGIN_OPTIONS':
      return { ...store, origOptionsVisible: !store.origOptionsVisible }

    case 'WAIT_FOR_USER_LOC_ORIGIN':
      return { ...store, origInputText: ' ', waitingUserLocOrigin: true }

    case 'SET_GEOCODED_ORIGIN':
      return {
        ...store,
        origObject: getOriginFromGeocodingResult(action.place),
        origInputText: action.place.properties.name,
        origOptionsVisible: false
      }

    case 'SET_ORIGIN_TO_USER_LOCATION': {
      const origObject = getOriginFromUserLocation(action.coords)
      return {
        ...store,
        waitingUserLocOrigin: false,
        origObject,
        origInputText: origObject.properties.label
      }
    }

    case 'UPDATE_USER_LOCATION':
      if (store.waitingUserLocOrigin) {
        const origObject = getOriginFromUserLocation(action.coords)
        return {
          ...store,
          waitingUserLocOrigin: false,
          origObject,
          origInputText: origObject.properties.label
        }
      } else {
        return store
      }

    case 'RESET_ORIGIN_INPUT':
      return initialOrig

    default:
      return store
  }
}

const showingCoordinates = (inputText: string): boolean => {
  const numberCount = inputText.replace(/[^0-9]/g, '').length
  return numberCount > Math.round(inputText.length / 2)
}

export const setOrigInputText = (event: ChangeEvent<HTMLInputElement>) => {
  return async (dispatch: any) => {
    const origInputText = event.target ? event.target.value : ''
    dispatch({ type: 'UPDATE_ORIG_INPUT_VALUE', origInputText })
    if (origInputText.length > 2 && !showingCoordinates(origInputText)) {
      const origOptions = await geocoding.geocodeAddress(origInputText)
      dispatch({ type: 'SET_ORIGIN_OPTIONS', origOptions })
    } else {
      dispatch({ type: 'SET_ORIGIN_OPTIONS', origOptions: [] })
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

export default origDestInputReducer