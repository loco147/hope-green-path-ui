import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import FindPathsButtons from './components/FindPathsButtons'
import TopControlPanel from './components/TopControlPanel'
import BottomControlPanel from './components/BottomControlPanel/BottomControlPanel'
import PathPanel from './components/PathPanel/PathPanel'
import Map from './components/Map/Map'
import MapControl from './components/Map/MapControl'
import UserLocation from './components/Map/UserLocation'
import PathShort from './components/Map/PathShort'
import PathSelected from './components/Map/PathSelected'
import PathsGreen from './components/Map/PathsGreen'
import PathsEdges from './components/Map/PathsEdges'
import OrigDestPoints from './components/Map/OrigDestPoints'
import WelcomeInfo from './scenes/WelcomeInfo/WelcomeInfo'
import DimLayer from './scenes/Home/DimLayer'
import HopeLink from './scenes/Home/HopeLink'
import { testGreenPathServiceConnection, testCleanPathServiceStatus } from './reducers/pathsReducer'
import { showWelcomeIfFirstVisit } from './reducers/visitorReducer'
import HomeControls from './scenes/Home/HomeControls'

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
    this.props.testGreenPathServiceConnection()
    this.props.testCleanPathServiceStatus()
  }

  render() {
    return (
      <div>
        <DimLayer />
        <HopeLink />
        <Map>
          <MapControl />
          <PathSelected />
          <PathsGreen />
          <PathShort />
          <PathsEdges />
          <OrigDestPoints />
          <UserLocation />
        </Map>
        <HomeControls />
        <WelcomeInfo />
        <TopPanel>
          <TopControlPanel />
        </TopPanel>
        <BottomPanel>
          <Notification />
          <FindPathsButtons />
          <PathPanel />
          <BottomControlPanel />
        </BottomPanel>
      </div>
    )
  }
}

const mapDispatchToProps = {
  showWelcomeIfFirstVisit,
  testGreenPathServiceConnection,
  testCleanPathServiceStatus,
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)
export default ConnectedApp
