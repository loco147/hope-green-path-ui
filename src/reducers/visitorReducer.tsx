import Cookies from 'cookies-js'
import { showInfo } from './uiReducer'
import { Action } from 'redux'

const initialVisitorState: VisitorReducer = {
  visitedBefore: false,
  usedOds: [],
  gaDisabled: false,
}

interface VisitorAction extends Action {
  odObject: OdPlace
}

const visitorReducer = (store: VisitorReducer = initialVisitorState, action: VisitorAction): VisitorReducer => {

  switch (action.type) {

    case 'VISITED_BEFORE': return { ...store, visitedBefore: true }

    case 'GA-DISABLED': return { ...store, gaDisabled: true }

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
    Cookies.set('visited', 'yes', { expires: 5184000 })
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

export const disableAnalyticsCookies = () => {
  //@ts-ignore
  window['ga-disable-G-JJJM7NNCXK'] = true
  Cookies.set('gp-ga-disabled', 'yes')
  localStorage.setItem('gp-ga-disabled', 'yes')
  return async (dispatch: any) => {
    dispatch({ type: 'GA-DISABLED' })
  }
}

export const maybeDisableAnalyticsCookies = () => {
  return async (dispatch: any) => {
    const gaDisabledCookie = Cookies.get('gp-ga-disabled')
    const gaDisabledLs = localStorage.getItem('gp-ga-disabled')
    console.log('analytics disabled: ', gaDisabledCookie, gaDisabledLs);
    if (gaDisabledCookie === 'yes' || gaDisabledLs === 'yes') {
      //@ts-ignore
      window['ga-disable-G-JJJM7NNCXK'] = true
      dispatch({ type: 'GA-DISABLED' })
    }
  }
}

export default visitorReducer
