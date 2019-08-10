const initialMenuState = {
  guide: false,
  pathStats: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }
    case 'SET_SHORTEST_PATH': return { ...store, pathStats: true }
    case 'TOGGLE_PATH_STATS': return { ...store, pathStats: !store.pathStats }

    default:
      return store
  }
}

export const toggleGuide = () => {
  return { type: 'TOGGLE_GUIDE' }
}

export const togglePathStats = () => {
  return { type: 'TOGGLE_PATH_STATS' }
}

export default menuReducer
