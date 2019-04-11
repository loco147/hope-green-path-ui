import React, { Component } from 'react'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Paths from './components/map/Paths'
import { getShortestPath } from './reducers/pathsReducer'

class App extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.getShortestPath()}>Get path</button>
        <Map>
          <Paths />
        </Map>
      </div>
    )
  }
}

const ConnectedApp = connect(null, { getShortestPath })(App)

export default ConnectedApp