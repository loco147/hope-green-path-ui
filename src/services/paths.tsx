import axios from 'axios'
import { analytics } from './../firebase/firebase'

let baseurl = process.env.REACT_APP_QP_URL ? process.env.REACT_APP_QP_URL : ''

if (process.env.NODE_ENV !== 'production') {
  baseurl = 'http://localhost:5000/'
}

export enum TravelMode {
  WALK = 'walk',
  BIKE = 'bike'
}

export enum RoutingMode {
  CLEAN = 'clean',
  QUIET = 'quiet'
}

export const getConnectionTestResponse = async (): Promise<string | any> => {
  console.log('testing connection to gp service at:', baseurl)
  const response = await axios.get(baseurl)
  return response
}

export const getCleanPathServiceStatus = async () => {
  console.log('testing clean path service status at:', baseurl)
  const response = await axios.get(baseurl.concat('aqistatus'))
  return response.data
}

const formCoordinateString = (originCoords: number[], destinationCoords: number[]): string => {
  const fromC = originCoords.map(coord => String(coord))
  const toC = destinationCoords.map(coord => String(coord))
  return fromC[1].concat(',', fromC[0], '/', toC[1], ',', toC[0])
}

export const getQuietPaths = async (travelMode: TravelMode, originCoords: number[], destinationCoords: number[]): Promise<PathDataResponse> => {
  const coordString = formCoordinateString(originCoords, destinationCoords)
  const queryUrl = baseurl.concat('paths/', travelMode, '/', RoutingMode.QUIET, '/', coordString)
  console.log('Querying quiet paths:', queryUrl)
  const response = await axios.get(queryUrl)
  if (response.data.error) {
    analytics.logEvent('routing_error_quiet_paths')
    throw response.data.error
  }
  analytics.logEvent('routed_quiet_paths')
  return response.data
}

export const getCleanPaths = async (travelMode: TravelMode, originCoords: number[], destinationCoords: number[]): Promise<PathDataResponse> => {
  const coordString = formCoordinateString(originCoords, destinationCoords)
  const queryUrl = baseurl.concat('paths/', travelMode, '/', RoutingMode.CLEAN, '/', coordString)
  console.log('Querying quiet paths:', queryUrl)
  const response = await axios.get(queryUrl)
  if (response.data.error) {
    analytics.logEvent('routing_error_clean_paths')
    throw response.data.error
  }
  analytics.logEvent('routed_clean_paths')
  return response.data
}

export const debugNearestEdgeAttrs = async (lngLat: LngLat): Promise<void> => {
  const coordString = String(lngLat.lat).concat(',', String(lngLat.lng))
  const queryUrl = baseurl.concat('edge-attrs-near-point/', coordString)
  const response = await axios.get(queryUrl)
  console.log('nearest edge at', lngLat, response.data)
}
