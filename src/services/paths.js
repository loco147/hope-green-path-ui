import axios from 'axios'

const baseurl = 'http://localhost:5000/'

export const getShortestPath = async () => {
    const response = await axios.get(baseurl.concat('shortestpath/60.217475,24.970034/60.205300,24.962894'))
    return response.data
}
