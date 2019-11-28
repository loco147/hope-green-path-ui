import axios from 'axios'

let baseurl = process.env.REACT_APP_QP_URL

if (process.env.NODE_ENV !== 'production') {
    baseurl = 'http://localhost:5000/'
}

export const getConnectionTestResponse = async () => {
    console.log('testing connection to qp service at:', baseurl)
    const response = await axios.get(baseurl)
    return response
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
    if (response.data.error) throw response.data.error
    return response.data
}

export const getCleanPaths = async (originCoords, destinationCoords) => {
    const coordString = formCoordinateString(originCoords, destinationCoords)
    const queryUrl = baseurl.concat('cleanpaths/', coordString)
    console.log('Querying quiet paths:', queryUrl)
    const response = await axios.get(queryUrl)
    if (response.data.error) throw response.data.error
    return response.data
}
