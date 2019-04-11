import React, { Component } from 'react'
import styled from 'styled-components'
import Map from './components/map/Map'
import Menu from './components/Menu'
import Paths from './components/map/Paths'
import OriginTargetPoints from './components/map/OriginTargetPoints'

const AbsoluteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 2;
`
const BottomPanel = styled(AbsoluteContainer)`
  bottom: 18px;
  left: 0px;
  right: 0px;
`

class App extends Component {
  render() {
    return (
      <div>
        <Map>
          <Paths />
          <OriginTargetPoints />
        </Map>
        <BottomPanel>
          <Menu />
        </BottomPanel>
      </div>
    )
  }
}

export default App
