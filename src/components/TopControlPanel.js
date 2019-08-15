import React from 'react'
import styled from 'styled-components'
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
  @media (min-width:591px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
const ButtonFlex = styled.div`
  @media (max-width: 590px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    }
  @media (min-width:591px) {
    margin: 0 0 0 5px;
    }
`

const TopControlPanel = (props) => {
  const { showingPaths, waitingPaths, resetPaths, userLocation, useUserLocOrigin } = props
  const showUserLocButton = !useUserLocOrigin && !showingPaths && !waitingPaths

  if (!showUserLocButton && !showingPaths) return null
  return (
    <ControlPanel>
      <ButtonFlex>
        {showingPaths
          ? <Button smaller bold white onClick={() => resetPaths()}> Reset</Button>
          : null}
        {showUserLocButton
          ? <Button small bold green onClick={() => props.useUserLocationOrigin(userLocation)}> Use current location</Button>
          : null}
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
