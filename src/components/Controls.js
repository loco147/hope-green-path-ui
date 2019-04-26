import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { useUserLocationOrigin } from './../reducers/originTargetReducer'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  align-items: center;
`

class Controls extends Component {
  render() {
    const { userLocFC } = this.props.userLocation
    const { useUserLocOrigin } = this.props.originTarget

    return (
      <OuterFlex>
        {useUserLocOrigin
          ? null
          : <Button small onClick={() => this.props.useUserLocationOrigin(userLocFC)}> Use current location</Button>
        }
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  originTarget: state.originTarget,
})

const ConnectedControls = connect(mapStateToProps, { useUserLocationOrigin })(Controls)

export default ConnectedControls
