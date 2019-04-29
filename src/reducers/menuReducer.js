const initialMenuState = {
  guide: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }

    default:
      return store
  }
}

export const toggleGuide = () => {
  return { type: 'TOGGLE_GUIDE' }
}

export default menuReducer
