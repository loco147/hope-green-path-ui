import { menu } from './../constants'
import { setVisitedStatusVisited, getVisitedStatus } from './visitorReducer'
import { testGreenPathServiceConnection } from './pathsReducer'
import { Action } from 'redux'

export enum Lang {
  EN = 'en',
  FI = 'fi'
}

const initialMenuState: UiReducer = {
  lang: Lang.EN,
  info: false,
  pathPanel: false,
  pathPanelContent: null,
}

const uiReducer = (store: UiReducer = initialMenuState, action: Action): UiReducer => {

  switch (action.type) {

    case 'TOGGLE_LANG': return { ...store, lang: store.lang === Lang.EN ? Lang.FI : Lang.EN }

    case 'SHOW_INFO': return { ...store, info: true }

    case 'HIDE_INFO': return { ...store, info: false }

    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    case 'SHOW_PATH_LIST': return { ...store, pathPanel: true, pathPanelContent: menu.pathList }

    case 'SHOW_LENGTH_FILTER_SELECTOR': return { ...store, pathPanel: true, pathPanelContent: menu.lengthLimitSelector }

    default:
      return store
  }
}

export const toggleLanguage = () => ({ type: 'TOGGLE_LANG' })

export const showInfo = () => ({ type: 'SHOW_INFO' })

export const hideInfo = () => {
  return (dispatch: any) => {
    const visited = getVisitedStatus()
    // if first visit, set visited cookie to yes and check connection to qp service
    if (!visited) {
      dispatch(setVisitedStatusVisited())
      dispatch(testGreenPathServiceConnection())
    }
    dispatch({ type: 'HIDE_INFO' })
  }
}

export const showMaxLengthFilterSelector = () => ({ type: 'SHOW_LENGTH_FILTER_SELECTOR' })

export const showPathList = () => ({ type: 'SHOW_PATH_LIST' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default uiReducer
