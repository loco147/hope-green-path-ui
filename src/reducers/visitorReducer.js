import Cookies from 'cookies-js'
import { showInfo } from './menuReducer'
import { showSetDestinationTooltip } from './originTargetReducer'

const initialVisitorState = {
  visitedBefore: false,
}

const visitorReducer = (store = initialVisitorState, action) => {

  switch (action.type) {

    case 'VISITED_BEFORE': return { ...store, visitedBefore: true }

    default:
      return store
  }
}

export const setVisitedStatusVisited = () => {
  return async (dispatch) => {
    Cookies.set('visited', 'yes', { expires: 365 })
    localStorage.setItem('visited', 'yes')
    console.log("set visited before cookie to 'yes'")
    dispatch({ type: 'VISITED_BEFORE' })
  }
}

export const getVisitedStatus = () => {
  const visitedC = Cookies.get('visited')
  const visitedLs = localStorage.getItem('visited')
  console.log('visited before (cookie):', visitedC)
  console.log('visited before (ls):', visitedLs)
  if (visitedC === 'yes' || visitedLs === 'yes') return true
  return false
}

export const showWelcomeIfFirstVisit = () => {
  return async (dispatch) => {
    const visited = getVisitedStatus()
    if (visited) {
      dispatch(showSetDestinationTooltip())
      dispatch({ type: 'VISITED_BEFORE' })
    } else {
      dispatch(showInfo())
    }
  }
}

export default visitorReducer
