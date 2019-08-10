import React from 'react'
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

const GetRoutesButton = ({ originTargetFC, originTargetError, routingId, waitingPaths, getQuietPaths }) => {
  const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
  const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)
  const originOrTargetMissing = originCoords === null || targetCoords === null

  return (
    <OuterFlex>
      {originOrTargetMissing || waitingPaths || originTargetError
        ? null
        : <Button border shadow onClick={() => getQuietPaths(originCoords, targetCoords, routingId)}> Get routes</Button>}
    </OuterFlex>
  )
}

const mapStateToProps = (state) => ({
  originTargetFC: state.originTarget.originTargetFC,
  originTargetError: state.originTarget.error,
  waitingPaths: state.paths.waitingPaths,
  routingId: state.paths.routingId,
})

const ConnectedGetRoutesButton = connect(mapStateToProps, { getShortestPath, getQuietPaths })(GetRoutesButton)

export default ConnectedGetRoutesButton
