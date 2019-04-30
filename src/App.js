import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Menu from './components/Menu'
import Controls from './components/Controls'
import PathInfo from './components/PathInfo'
import MapControl from './components/map/MapControl'
import PathShort from './components/map/PathShort'
import PathQuiet from './components/map/PathQuiet'
import PathSelected from './components/map/PathSelected'
import OriginTargetPoints from './components/map/OriginTargetPoints'
import ToggleGuideButton from './components/guide/ToggleGuideButton'
import Guide from './components/guide/Guide'
import DimLayer from './components/DimLayer'

const AbsoluteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  `
const TopPanel = styled(AbsoluteContainer)`
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
  `
  const BottomPanel = styled(AbsoluteContainer)`
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 3;
`

class App extends Component {
  render() {
    const { sPathFC } = this.props
    return (
      <div>
        <Map>
          <MapControl />
          <PathSelected />
          <PathShort />
          <PathQuiet />
          <OriginTargetPoints />
        </Map>
        <DimLayer />
        <ToggleGuideButton />
        <Guide />
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
