import React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import store from '../../store'
import { setOriginFromMap } from '../../reducers/originReducer'
import { setDest } from '../../reducers/origDestReducer'
import { Button } from '../Button'

const StyledPopupDiv = styled.div`
  margin: -5px 11px -10px -6px;
`

class SelectLocationsPopup extends React.Component<PropsFromRedux> {

  render() {
    const { visible, lngLat, origDestFC } = this.props
    if (!visible) return null

    return (
      <StyledPopupDiv>
        {/* @ts-ignore */}
        <Button smallest border green disabled={false} onClick={() => store.dispatch(setOriginFromMap(lngLat))}>Route from here</Button>
        {/* @ts-ignore */}
        <Button smallest border green disabled={false} onClick={() => store.dispatch(setDest(lngLat, origDestFC))}>Route here</Button>
      </StyledPopupDiv >
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  visible: state.mapPopup.visible,
  lngLat: state.mapPopup.lngLat,
  origDestFC: state.origDest.origDestFC,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(SelectLocationsPopup)