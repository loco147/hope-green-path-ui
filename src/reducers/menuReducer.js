const initialMenuState = {
  guide: false,
  maxDetourFilterSelector: true,
  pathPanel: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }

    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true }

    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    case 'TOGGLE_MAX_DETOUR_FILTER_SELECTOR': {
      const maxDetourFilterSelector = store.pathPanel ? !store.maxDetourFilterSelector : true
      return { ...store, pathPanel: true, maxDetourFilterSelector }
    }

    default:
      return store
  }
}

export const toggleGuide = () => ({ type: 'TOGGLE_GUIDE' })

export const togglemaxDetourFilterSelector = () => ({ type: 'TOGGLE_MAX_DETOUR_FILTER_SELECTOR' })

export const togglePathPanel = () => ({ type: 'TOGGLE_PATH_PANEL' })

export default menuReducer
