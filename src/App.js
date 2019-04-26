import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Menu from './components/Menu'
import Controls from './components/Controls'
import PathInfo from './components/PathInfo'
import PathShort from './components/map/PathShort'
import PathQuiet from './components/map/PathQuiet'
import PathSelected from './components/map/PathSelected'
import OriginTargetPoints from './components/map/OriginTargetPoints'

const AbsoluteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 2;
`
const TopPanel = styled(AbsoluteContainer)`
  top: 10px;
  left: 0px;
  right: 0px;
`
const BottomPanel = styled(AbsoluteContainer)`
  bottom: 31px;
  left: 0px;
  right: 0px;
`

class App extends Component {
  render() {
    const { sPathFC } = this.props
    return (
      <div>
        <Map>
          <PathSelected />
          <PathShort />
          <PathQuiet />
          <OriginTargetPoints />
        </Map>
        <TopPanel>
          <Controls/>
        </TopPanel>
        <BottomPanel>
          {sPathFC.features.length === 0
            ? <Menu />
            : <PathInfo />
          }
        </BottomPanel>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sPathFC: state.paths.sPathFC,
})

const ConnectedApp = connect(mapStateToProps, null)(App)
export default ConnectedApp
