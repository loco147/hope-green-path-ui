import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import store from '../../store'
import { setOrigin, setTarget } from '../../reducers/originTargetReducer'
import { Button } from '../Button'

const StyledPopupDiv = styled.div`
  margin: -5px 9px -10px -6px;
`

class SelectLocationsPopup extends React.Component {

  render() {
    const { visible, lngLat, originTargetFC, routingId } = this.props
    if (!visible) return null

    return (
      <StyledPopupDiv>
        <Button setLoc border disabled={false} submit onClick={() => store.dispatch(setOrigin(lngLat, originTargetFC))}>Route from here</Button>
        <Button setLoc border disabled={false} submit onClick={() => store.dispatch(setTarget(lngLat, originTargetFC, routingId))}>Route here</Button>
      </StyledPopupDiv >
    )
  }
}

const mapStateToProps = (state) => ({
  visible: state.mapPopup.visible,
  lngLat: state.mapPopup.lngLat,
  routingId: state.paths.routingId,
  originTargetFC: state.originTarget.originTargetFC,
})

const ConnectedSelectLocationsPopup = connect(mapStateToProps, null)(SelectLocationsPopup)

export default ConnectedSelectLocationsPopup
