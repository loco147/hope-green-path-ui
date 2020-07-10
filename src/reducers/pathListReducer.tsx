const initialPathList = {
  scrollToPath: '',
  routingId: 0,
}

const pathListReducer = (store = initialPathList, action) => {

  switch (action.type) {

    case 'SCROLL_TO_PATH': return { ...store, scrollToPath: action.pathId }

    default:
      return store
  }
}

export const scrollToPath = (pathId) => {
  return { type: 'SCROLL_TO_PATH', pathId }
}

export default pathListReducer
