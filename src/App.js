import React, { Component } from 'react'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import { getShortestPath } from './reducers/pathsReducer'

class App extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.getShortestPath()}>Get path</button>
        <Map>
        </Map>
      </div>
    )
  }
}

const ConnectedApp = connect(null, { getShortestPath })(App)

export default ConnectedApp