import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import DetourLimitInput from './DetourLimitInput'
import { useUserLocationOrigin } from './../reducers/originTargetReducer'

const ControlBox = styled.div`
  margin: 0px;
  background-color: rgba(255,255,255,0.8);
  padding: 3px 5px 5px 5px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
const ButtonFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Controls extends Component {
  render() {
    const { userLocFC } = this.props.userLocation
    const { useUserLocOrigin } = this.props.originTarget

    return (
      <ControlBox>
        <DetourLimitInput />
        <ButtonFlex>
          {useUserLocOrigin
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
})

const ConnectedControls = connect(mapStateToProps, { useUserLocationOrigin })(Controls)

export default ConnectedControls
