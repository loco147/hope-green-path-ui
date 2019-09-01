import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mapReducer from './reducers/mapReducer'
import userLocationReducer from './reducers/userLocationReducer'
import notificationReducer from './reducers/notificationReducer'
import pathsReducer from './reducers/pathsReducer'
import originTargetReducer from './reducers/originTargetReducer'
import mapPopupReducer from './reducers/mapPopupReducer'
import visitorReducer from './reducers/visitorReducer'
import menuReducer from './reducers/menuReducer'

const reducer = combineReducers({
  map: mapReducer,
  userLocation: userLocationReducer,
  notification: notificationReducer,
  paths: pathsReducer,
  originTarget: originTargetReducer,
  mapPopup: mapPopupReducer,
  visitor: visitorReducer,
  menu: menuReducer,
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
