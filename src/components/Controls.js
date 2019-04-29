import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import DetourLimitInput from './DetourLimitInput'
import { useUserLocationOrigin } from './../reducers/originTargetReducer'

const ControlBox = styled.div`
  margin: 0px;
  background-color: rgba(255,255,255,0.9);
  padding: 3px 5px 2px 5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15), 0 6px 20px 0 rgba(0,0,0,0.09);
  @media (min-width:660px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
const ButtonFlex = styled.div`
  @media (max-width: 659px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    }
  @media (min-width:660px) {
    margin: 0 0 0 5px;
    }
`

class Controls extends Component {
  render() {
    const { userLocFC } = this.props.userLocation
    const { useUserLocOrigin } = this.props.originTarget
    const showingPaths = this.props.sPathFC.features.length > 0 || this.props.waitingPaths

    return (
      <ControlBox>
        <DetourLimitInput />
        <ButtonFlex>
          {useUserLocOrigin || showingPaths
            ? null
            : <Button small onClick={() => this.props.useUserLocationOrigin(userLocFC)}> Use current location</Button>
          }
        </ButtonFlex>
      </ControlBox>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  originTarget: state.originTarget,
  sPathFC: state.paths.sPathFC,
  waitingPaths: state.paths.waitingPaths,
})

const ConnectedControls = connect(mapStateToProps, { useUserLocationOrigin })(Controls)

export default ConnectedControls
