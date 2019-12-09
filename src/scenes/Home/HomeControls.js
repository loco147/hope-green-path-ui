import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { showInfo } from './../../reducers/menuReducer'
import { zoomToUserLocation } from '../../reducers/userLocationReducer'
import { resetPaths } from '../../reducers/pathsReducer'
import { LocateButton } from './LocateButton'
import ResetPathsButton from './ResetPathsButton'

const Container = styled.div`
  position: absolute;
  top: 9px;
  right: 9px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${props => props.topOffset === true && css`
    top: 100px;
  `}
`
const ShowInfoButton = styled.div`
  margin: 5px 0px;
  pointer-events: auto;
  cursor: pointer;
  padding: 1px 11px;
  font-weight: 640;
  border-radius: 8px;
  font-size: 22px;
  border: 2px solid black;
  background-color: white;
  color: black;
  width: min-content;
  &:before {
    content: 'i';
  }
  @media (min-width: 600px) {
    &:hover { 
      margin-right: 2px;
    }
  }
`

const HomeControls = ({ menu, showInfo, userLocation, showingPaths, waitingPaths, zoomToUserLocation, resetPaths }) => {
  return (
    <Container topOffset={!showingPaths && !waitingPaths}>
      {showingPaths || waitingPaths ? <ResetPathsButton handleClick={() => resetPaths(userLocation.lngLat)} /> : null}
      {!menu.info ? <ShowInfoButton onClick={showInfo} /> : null}
      <LocateButton handleClick={() => zoomToUserLocation(userLocation)} />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  userLocation: state.userLocation,
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
})

const ConnectedHomeControls = connect(mapStateToProps, { showInfo, zoomToUserLocation, resetPaths })(HomeControls)
export default ConnectedHomeControls
