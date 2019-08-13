import axios from 'axios'

let baseurl = process.env.REACT_APP_QP_URL

if (process.env.NODE_ENV !== 'production') {
    baseurl = 'http://localhost:5000/'
}

export const getShortestPath = async (originCoords, targetCoords) => {
    const fromC = originCoords.map(coord => String(coord))
    const toC = targetCoords.map(coord => String(coord))
    const coordString = fromC[1].concat(',',fromC[0],'/',toC[1],',',toC[0])
    const response = await axios.get(baseurl.concat('shortestpath/', coordString))
    return response.data
}

export const getQuietPaths = async (originCoords, targetCoords) => {
    console.log('querying quiet paths from', baseurl)
    const fromC = originCoords.map(coord => String(coord))
    const toC = targetCoords.map(coord => String(coord))
    const coordString = fromC[1].concat(',',fromC[0],'/',toC[1],',',toC[0])
    const response = await axios.get(baseurl.concat('quietpaths/', coordString))
    return response.data
}
