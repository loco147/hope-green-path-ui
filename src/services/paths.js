import axios from 'axios'
import { analytics } from './../firebase/firebase'

let baseurl = process.env.REACT_APP_QP_URL

if (process.env.NODE_ENV !== 'production') {
    baseurl = 'http://localhost:5000/'
}

export const getConnectionTestResponse = async () => {
    console.log('testing connection to gp service at:', baseurl)
    const response = await axios.get(baseurl)
    return response
}

export const getCleanPathServiceStatus = async () => {
    console.log('testing clean path service status at:', baseurl)
    const response = await axios.get(baseurl.concat('aqistatus'))
    return response.data
}

const formCoordinateString = (originCoords, destinationCoords) => {
    const fromC = originCoords.map(coord => String(coord))
    const toC = destinationCoords.map(coord => String(coord))
    return fromC[1].concat(',',fromC[0],'/',toC[1],',',toC[0])
}

export const getQuietPaths = async (originCoords, destinationCoords) => {
    const coordString = formCoordinateString(originCoords, destinationCoords)
    const queryUrl = baseurl.concat('quietpaths/', coordString)
    console.log('Querying quiet paths:', queryUrl)
    const response = await axios.get(queryUrl)
    if (response.data.error) {
        analytics.logEvent('routing_error_quiet_paths')
        throw response.data.error
    }
    analytics.logEvent('routed_quiet_paths')
    return response.data
}

export const getCleanPaths = async (originCoords, destinationCoords) => {
    const coordString = formCoordinateString(originCoords, destinationCoords)
    const queryUrl = baseurl.concat('cleanpaths/', coordString)
    console.log('Querying quiet paths:', queryUrl)
    const response = await axios.get(queryUrl)
    if (response.data.error) {
        analytics.logEvent('routing_error_clean_paths')
        throw response.data.error
    }
    analytics.logEvent('routed_clean_paths')
    return response.data
}
