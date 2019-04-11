import axios from 'axios'

const baseurl = 'http://localhost:5000/'

export const getShortestPath = async (originCoords, targetCoords) => {
    const fromC = originCoords.map(coord => String(coord))
    const toC = targetCoords.map(coord => String(coord))
    const coordString = fromC[1].concat(',',fromC[0],'/',toC[1],',',toC[0])
    const response = await axios.get(baseurl.concat('shortestpath/', coordString))
    return response.data
}
