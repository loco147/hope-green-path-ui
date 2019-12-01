import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { getCleanPaths, getQuietPaths } from '../reducers/pathsReducer'
import { utils } from '../utils'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 13px 10px;
  align-items: center;
`

const FindPathsButtons = (props) => {
  const { cleanPathsAvailable, originTargetFC, originTargetError, routingId,
    waitingPaths, showingPaths, getCleanPaths, getQuietPaths } = props
  const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
  const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)
  const originOrTargetMissing = originCoords === null || targetCoords === null

  if (originOrTargetMissing || showingPaths || waitingPaths || originTargetError) {
    return null
  }

  return (
    <OuterFlex>
      {cleanPathsAvailable
        ? <Button border green shadow onClick={() => getCleanPaths(originCoords, targetCoords, routingId)}> Find clean paths</Button>
        : null
      }
      <Button border green shadow onClick={() => getQuietPaths(originCoords, targetCoords, routingId)}> Find quiet paths</Button>
    </OuterFlex>
  )
}

const mapStateToProps = (state) => ({
  originTargetFC: state.originTarget.originTargetFC,
  originTargetError: state.originTarget.error,
  waitingPaths: state.paths.waitingPaths,
  showingPaths: state.paths.showingPaths,
  routingId: state.paths.routingId,
  cleanPathsAvailable: state.paths.cleanPathsAvailable,
})

const ConnectedFindPathsButtons = connect(mapStateToProps, { getCleanPaths, getQuietPaths })(FindPathsButtons)

export default ConnectedFindPathsButtons
