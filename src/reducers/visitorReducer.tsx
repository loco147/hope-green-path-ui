import Cookies from 'cookies-js'
import { showInfo } from './uiReducer'
import { Action } from 'redux'

const initialVisitorState: VisitorReducer = {
  visitedBefore: false,
  usedOds: []
}

interface VisitorAction extends Action {
  odObject: OdPlace
}

const visitorReducer = (store: VisitorReducer = initialVisitorState, action: VisitorAction): VisitorReducer => {

  switch (action.type) {

    case 'VISITED_BEFORE': return { ...store, visitedBefore: true }

    case 'SET_USED_OD': {
      const filteredOds = store.usedOds.filter((od) =>
        od.properties.label !== action.odObject.properties.label
      )
      filteredOds.unshift(action.odObject)
      return { ...store, usedOds: filteredOds.slice(0, 10) }
    }

    default:
      return store
  }
}

export const setVisitedStatusVisited = () => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    const visited = getVisitedStatus()
    if (visited) {
      dispatch({ type: 'VISITED_BEFORE' })
    } else {
      dispatch(showInfo())
    }
  }
}

export default visitorReducer
