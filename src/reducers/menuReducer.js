import { menu } from './../constants'

const initialMenuState = {
  guide: false,
  info: true,
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

export const hideInfo = () => ({ type: 'HIDE_INFO' })

export const showMaxDetourFilterSelector = () => ({ type: 'SHOW_DETOUR_FILTER_SELECTOR' })

export const showPathList = () => ({ type: 'SHOW_PATH_LIST' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default menuReducer
