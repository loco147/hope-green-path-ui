const initialMenuState = {
  guide: false,
  maxDetourFilterSelector: false,
  pathPanel: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }

    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true }

    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    case 'SHOW_PATH_LIST': return { ...store, pathPanel: true, maxDetourFilterSelector: false }

    case 'SHOW_DETOUR_FILTER_SELECTOR': return { ...store, pathPanel: true, maxDetourFilterSelector: true }

    default:
      return store
  }
}

export const toggleGuide = () => ({ type: 'TOGGLE_GUIDE' })

export const showMaxDetourFilterSelector = () => ({ type: 'SHOW_DETOUR_FILTER_SELECTOR' })

export const showPathList = () => ({ type: 'SHOW_PATH_LIST' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default menuReducer
