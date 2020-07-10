import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import SelectLocationsPopup from './components/Map/SelectLocationsPopup'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  const popupElement = document.getElementById('popup')
  if (popupElement) {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <SelectLocationsPopup />
        </div>
      </Provider>,
      popupElement
    )
  }
}

render()
store.subscribe(render)
