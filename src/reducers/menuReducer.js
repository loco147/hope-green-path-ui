const initialMenuState = {
  guide: false,
  pathPanel: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }
    case 'SET_SHORTEST_PATH': return { ...store, pathPanel: true }
    case 'TOGGLE_PATH_PANEL': return { ...store, pathPanel: !store.pathPanel }

    default:
      return store
  }
}

export const toggleGuide = () => {
  return { type: 'TOGGLE_GUIDE' }
}

export const togglePathPanel = () => {
  return { type: 'TOGGLE_PATH_PANEL' }
}

export default menuReducer
