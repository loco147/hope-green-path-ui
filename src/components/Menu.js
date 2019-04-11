import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { getShortestPath } from './../reducers/pathsReducer'
import { utils } from './../utils'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  align-items: center;
`

class Menu extends Component {
  render() {
    const { originTargetFC } = this.props
    const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
    const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)

    return (
      <OuterFlex>
        <Button onClick={() => this.props.getShortestPath(originCoords, targetCoords)}> Get route</Button>
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  originTargetFC: state.originTarget.originTargetFC,
})

const ConnectedMenu = connect(mapStateToProps, { getShortestPath })(Menu)

export default ConnectedMenu
