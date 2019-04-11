import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Menu from './components/Menu'
import PathInfo from './components/PathInfo'
import Paths from './components/map/Paths'
import OriginTargetPoints from './components/map/OriginTargetPoints'

const AbsoluteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 2;
`
const BottomPanel = styled(AbsoluteContainer)`
  bottom: 25px;
  left: 0px;
  right: 0px;
`

class App extends Component {
  render() {
    const { shortestPath } = this.props.paths
    return (
      <div>
        <Map>
          <Paths />
          <OriginTargetPoints />
        </Map>
        <BottomPanel>
          {shortestPath.features.length === 0
            ? <Menu />
            : <PathInfo />
          }
        </BottomPanel>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
})

const ConnectedApp = connect(mapStateToProps, null)(App)
export default ConnectedApp
