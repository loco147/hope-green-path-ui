import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { getQuietPaths } from '../reducers/pathsReducer'
import { utils } from '../utils'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 13px 10px;
  align-items: center;
`

const GetRoutesButton = ({ originTargetFC, originTargetError, routingId, waitingPaths, showingPaths, getQuietPaths }) => {
  const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
  const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)
  const originOrTargetMissing = originCoords === null || targetCoords === null

  return (
    <OuterFlex>
      {originOrTargetMissing || showingPaths || waitingPaths || originTargetError
        ? null
        : <Button border green shadow onClick={() => getQuietPaths(originCoords, targetCoords, routingId)}> Get routes</Button>}
    </OuterFlex>
  )
}

const mapStateToProps = (state) => ({
  originTargetFC: state.originTarget.originTargetFC,
  originTargetError: state.originTarget.error,
  waitingPaths: state.paths.waitingPaths,
  showingPaths: state.paths.showingPaths,
  routingId: state.paths.routingId,
})

const ConnectedGetRoutesButton = connect(mapStateToProps, { getQuietPaths })(GetRoutesButton)

export default ConnectedGetRoutesButton
