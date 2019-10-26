import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Notification from './components/Notification'
import GetRoutesButton from './components/GetRoutesButton'
import TopControlPanel from './components/TopControlPanel'
import BottomControlPanel from './components/BottomControlPanel'
import PathPanel from './components/pathpanel/PathPanel'
import MapControl from './components/map/MapControl'
import UserLocation from './components/map/UserLocation'
import PathShort from './components/map/PathShort'
import PathQuiet from './components/map/PathQuiet'
import PathEdges from './components/map/PathEdges'
import PathSelected from './components/map/PathSelected'
import OriginTargetPoints from './components/map/OriginTargetPoints'
import Guide from './components/guide/Guide'
import WelcomeInfo from './components/guide/WelcomeInfo'
import DimLayer from './components/DimLayer'
import { testQuietPathServiceConnection } from './reducers/pathsReducer'
import { showWelcomeIfFirstVisit } from './reducers/visitorReducer'
import ShowInfoButton from './components/guide/ShowInfoButton'

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
    this.props.showWelcomeIfFirstVisit()
    this.props.testQuietPathServiceConnection()
  }

  render() {
    return (
      <div>
        <DimLayer />
        <Map>
          <MapControl />
          <PathSelected />
          <PathQuiet />
          <PathShort />
          <PathEdges />
          <OriginTargetPoints />
          <UserLocation />
        </Map>
        <Guide />
        <ShowInfoButton />
        <WelcomeInfo />
        <TopPanel>
          <TopControlPanel />
        </TopPanel>
        <BottomPanel>
          <Notification />
          <GetRoutesButton />
          <PathPanel />
          <BottomControlPanel />
        </BottomPanel>
      </div>
    )
  }
}

const ConnectedApp = connect(null, { showWelcomeIfFirstVisit, testQuietPathServiceConnection })(App)
export default ConnectedApp
