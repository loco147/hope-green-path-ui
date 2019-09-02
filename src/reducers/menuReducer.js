import { menu } from './../constants'
import { setVisitedStatusVisited, getVisitedStatus } from './visitorReducer'
import { showSetDestinationTooltip } from './originTargetReducer'
import { testQuietPathServiceConnection } from './pathsReducer'

const initialMenuState = {
  guide: false,
  info: false,
  pathPanel: false,
  pathPanelContent: null,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }

    case 'SHOW_INFO': return { ...store, info: true }

    case 'HIDE_INFO': return { ...store, info: false }

    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    case 'SHOW_PATH_LIST': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'SHOW_DETOUR_FILTER_SELECTOR': return { ...store, pathPanel: true, pathPanelContent: menu.detourFilterSelector }

    default:
      return store
  }
}

export const toggleGuide = () => ({ type: 'TOGGLE_GUIDE' })

export const showInfo = () => ({ type: 'SHOW_INFO' })

export const hideInfo = (showingPaths) => {
  return (dispatch) => {
    const visited = getVisitedStatus()
    // if first visit, set visited cookie to yes and check connection to qp service
    if (!visited) {
      dispatch(setVisitedStatusVisited())
      dispatch(testQuietPathServiceConnection())
    }
    if (!showingPaths) dispatch(showSetDestinationTooltip())
    dispatch({ type: 'HIDE_INFO' })
  }
}

export const showMaxDetourFilterSelector = () => ({ type: 'SHOW_DETOUR_FILTER_SELECTOR' })

export const showPathList = () => ({ type: 'SHOW_PATH_LIST' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default menuReducer
