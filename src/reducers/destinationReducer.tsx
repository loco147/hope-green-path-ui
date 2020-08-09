import { Action } from 'redux'
import { ChangeEvent } from 'react'
import { LocationType, OdType } from './originReducer'
import * as geocoding from './../services/geocoding'

const initialDest: DestinationReducer = {
  error: null,
  destInputText: '',
  destObject: null,
  destOptions: [],
  destOptionsVisible: false,
}

interface DestinationAction extends Action {
  destInputText: string,
  destOptions: GeocodingResult[],
  place: GeocodingResult,
  coords: [number, number]
}

const destinationReducer = (store: DestinationReducer = initialDest, action: DestinationAction): DestinationReducer => {

  switch (action.type) {

    case 'UPDATE_DESTINATION_INPUT_VALUE':
      return {
        ...store,
        destInputText: action.destInputText
      }

    case 'SET_DESTINATION_OPTIONS':
      return {
        ...store,
        destOptions: action.destOptions,
        destOptionsVisible: true
      }

    case 'HIDE_DESTINATION_OPTIONS':
      return { ...store, destOptionsVisible: false }

    case 'TOGGLE_DESTINATION_OPTIONS':
      return { ...store, destOptionsVisible: !store.destOptionsVisible }

    case 'SET_GEOCODED_DESTINATION':
      return {
        ...store,
        destObject: getDestinationFromGeocodingResult(action.place),
        destInputText: action.place.properties.name,
        destOptionsVisible: false
      }

    case 'RESET_DESTINATION_INPUT':
      return initialDest

    default:
      return store
  }
}

export const setDestinationInputText = (event: ChangeEvent<HTMLInputElement>) => {
  return async (dispatch: any) => {
    const destInputText = event.target ? event.target.value : ''
    dispatch({ type: 'UPDATE_DESTINATION_INPUT_VALUE', destInputText })
    if (destInputText.length > 2) {
      const destOptions = await geocoding.geocodeAddress(destInputText)
      dispatch({ type: 'SET_DESTINATION_OPTIONS', destOptions })
    } else {
      dispatch({ type: 'HIDE_DESTINATION_OPTIONS' })
      dispatch({ type: 'SET_DESTINATION_OPTIONS', destOptions: [] })
    }
  }
}

export const setGeocodedDestination = (place: GeocodingResult) => {
  return { type: 'SET_GEOCODED_DESTINATION', place }
}

export const hideDestinationOptions = () => {
  return { type: 'HIDE_DESTINATION_OPTIONS' }
}

export const resetDestinationInput = () => {
  return { type: 'RESET_DESTINATION_INPUT' }
}

export const toggleDestinationOptionsVisible = () => {
  return { type: 'TOGGLE_DESTINATION_OPTIONS' }
}

const getDestinationFromGeocodingResult = (place: GeocodingResult): OdPlace => {
  return { ...place, properties: { ...place.properties, locationType: LocationType.ADDRESS, odType: OdType.DESTINATION } }
}

export default destinationReducer