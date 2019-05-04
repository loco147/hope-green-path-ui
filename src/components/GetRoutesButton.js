import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { getShortestPath, getQuietPaths } from '../reducers/pathsReducer'
import { utils } from '../utils'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 13px 10px;
  align-items: center;
`

class GetRoutesButton extends Component {
  render() {
    const { originTargetFC, originTargetError } = this.props
    const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
    const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)
    const originOrTargetMissing = originCoords === null || targetCoords === null

    return (
      <OuterFlex>
        {/* hide the button when not ready for routing*/}
        {originOrTargetMissing || this.props.waitingPaths || originTargetError
          ? null
          : <Button border shadow onClick={() => this.props.getQuietPaths(originCoords, targetCoords)}> Get routes</Button>
        }
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  originTargetFC: state.originTarget.originTargetFC,
  originTargetError: state.originTarget.error,
  waitingPaths: state.paths.waitingPaths,
})

const ConnectedGetRoutesButton = connect(mapStateToProps, { getShortestPath, getQuietPaths })(GetRoutesButton)

export default ConnectedGetRoutesButton
