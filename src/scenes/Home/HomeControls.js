import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { showInfo } from './../../reducers/menuReducer'
import { zoomToUserLocation } from '../../reducers/userLocationReducer'
import { LocateButton } from './LocateButton'

const Container = styled.div`
  position: absolute;
  top: 67px;
  right: 9px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;;
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
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:before {
    content: 'i';
  }
  @media (min-width: 600px) {
    &:hover { 
      background-color: black;
      color: white;
    }
  }
`

const HomeControls = ({ menu, absolute, showInfo, userLocation, zoomToUserLocation }) => {
  return (
    <Container>
      {!menu.info ? <ShowInfoButton onClick={showInfo} /> : null}
      <LocateButton handleClick={() => zoomToUserLocation(userLocation)} />
    </Container>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  userLocation: state.userLocation,
})

const ConnectedHomeControls = connect(mapStateToProps, { showInfo, zoomToUserLocation })(HomeControls)
export default ConnectedHomeControls
