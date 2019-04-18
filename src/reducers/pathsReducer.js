import { turf } from '../utils/index'
import * as paths from './../services/paths'
// import { egPaths } from '../temp/eg_path_features.js'

const initialPaths = {
  qPathFC: turf.asFeatureCollection([]),
  sPathFC: turf.asFeatureCollection([]),
}

const pathsReducer = (store = initialPaths, action) => {

  switch (action.type) {
    case 'SET_SHORTEST_PATH':
      return {
        ...store,
        sPathFC: turf.asFeatureCollection(action.sPath)
      }

    case 'SET_QUIET_PATH':
      return {
        ...store,
        qPathFC: turf.asFeatureCollection(action.qPaths)
      }

    case 'SET_ORIGIN':
    case 'SET_TARGET':
      return {
        ...store,
        qPathFC: turf.asFeatureCollection([]),
        sPathFC: turf.asFeatureCollection([]),
      }

    case 'RESET_PATHS':
      return initialPaths

    default:
      return store
  }
}

export const getShortestPath = (originCoords, targetCoords) => {
  return async (dispatch) => {
    const pathFC = await paths.getShortestPath(originCoords, targetCoords)
    console.log('pathFC', pathFC)
    dispatch({ type: 'SET_SHORTEST_PATH', pathFC })
  }
}

export const getQuietPaths = (originCoords, targetCoords) => {
  return async (dispatch) => {
    const pathFeats = await paths.getQuietPaths(originCoords, targetCoords)
    console.log('pathFC', pathFeats)
    const sPath = pathFeats.filter(feat => feat.properties.type === 'short')
    const qPaths = pathFeats.filter(feat => feat.properties.type === 'quiet' && feat.properties.diff_len !== 0)
    dispatch({ type: 'SET_SHORTEST_PATH', sPath })
    dispatch({ type: 'SET_QUIET_PATH', qPaths })
  }
}

export default pathsReducer
