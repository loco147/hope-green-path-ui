import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import store from '../../store'
import { setOrigin, setDest } from '../../reducers/origDestReducer'
import { Button } from '../Button'

const StyledPopupDiv = styled.div`
  margin: -5px 11px -10px -6px;
`

class SelectLocationsPopup extends React.Component {

  render() {
    const { visible, lngLat, origDestFC, routingId } = this.props
    if (!visible) return null

    return (
      <StyledPopupDiv>
        <Button smallest border green disabled={false} submit onClick={() => store.dispatch(setOrigin(lngLat, origDestFC))}>Route from here</Button>
        <Button smallest border green disabled={false} submit onClick={() => store.dispatch(setDest(lngLat, origDestFC, routingId))}>Route here</Button>
      </StyledPopupDiv >
    )
  }
}

const mapStateToProps = (state) => ({
  visible: state.mapPopup.visible,
  lngLat: state.mapPopup.lngLat,
  routingId: state.paths.routingId,
  origDestFC: state.origDest.origDestFC,
})

const ConnectedSelectLocationsPopup = connect(mapStateToProps, null)(SelectLocationsPopup)

export default ConnectedSelectLocationsPopup
