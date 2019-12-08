import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { useUserLocationOrigin } from '../reducers/originTargetReducer'
import { resetPaths } from './../reducers/pathsReducer'

const ControlPanel = styled.div`
  margin: 0px;
  background-color: rgba(255,255,255,0.98);
  padding: 3px 5px 2px 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15), 0 6px 20px 0 rgba(0,0,0,0.09);
  justify-content: center;
  pointer-events: auto;
  ${props => props.hideBackground === true && css`
    background: none;
    box-shadow: none;
    pointer-events: none;
  `}
`
const ButtonFlex = styled.div`
  display: flex;
  width: calc(100% - 36px);
  justify-content: space-evenly;
  align-items: center;
  min-height: 43px;
`

const TopControlPanel = (props) => {
  const { showingPaths, waitingPaths, resetPaths, userLocation, useUserLocOrigin } = props
  const showUserLocButton = !useUserLocOrigin && !showingPaths && !waitingPaths

  return (
    <ControlPanel hideBackground={showingPaths || useUserLocOrigin}>
      <ButtonFlex>
        {showingPaths
          ? <Button smaller bold white onClick={() => resetPaths(userLocation.lngLat)}> Reset</Button> : null}
        {showUserLocButton
          ? <Button small bold green onClick={() => props.useUserLocationOrigin(userLocation)}> Use current location</Button> : null}
      </ButtonFlex>
    </ControlPanel>
  )
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  useUserLocOrigin: state.originTarget.useUserLocOrigin,
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
})

const ConnectedTopControlPanel = connect(mapStateToProps, { useUserLocationOrigin, resetPaths })(TopControlPanel)

export default ConnectedTopControlPanel
