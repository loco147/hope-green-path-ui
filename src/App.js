import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Notification from './components/Notification'
import GetRoutesButton from './components/GetRoutesButton'
import TopControls from './components/TopControls'
import PathInfo from './components/PathInfo'
import MapControl from './components/map/MapControl'
import PathShort from './components/map/PathShort'
import PathQuiet from './components/map/PathQuiet'
import PathSelected from './components/map/PathSelected'
import OriginTargetPoints from './components/map/OriginTargetPoints'
import ToggleGuideButton from './components/guide/ToggleGuideButton'
import Guide from './components/guide/Guide'
import DimLayer from './components/DimLayer'
import { showSetDestinationTooltip } from './reducers/originTargetReducer'

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

  componentDidMount() {
    this.props.showSetDestinationTooltip()
  }

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
          <TopControls/>
        </TopPanel>
        <BottomPanel>
          <Notification />
          {sPathFC.features.length === 0
            ? <GetRoutesButton />
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

const ConnectedApp = connect(mapStateToProps, { showSetDestinationTooltip })(App)
export default ConnectedApp
