import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { PathInfoBox, OpenPathBox } from './PathInfoBox'

const PathPanelContainer = styled.div`
  margin: 0px;
  background: rgba(255,255,255,0.95);
  overflow: auto;
  width: auto;
  max-height: 220px;
  pointer-events: auto;
  padding: 6px 6px 3px 6px;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  @media (min-width: 600px) {
    width 340px;
    max-height: calc(100vh - 121px);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`
const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`

const PathPanel = ({ showingPaths, pathStatsVisible, sPathFC, qPathFC, selPathFC, detourLimit }) => {
  if (!showingPaths || !pathStatsVisible) { return null }

  const selPathId = selPathFC.features.length > 0
    ? selPathFC.features[0].properties.id
    : 'none'

  const sPath = sPathFC.features[0]
  const qPaths = qPathFC.features.filter(path => path.properties.len_diff < detourLimit)

  return (
    <PathPanelContainer>
      <PathRowFlex>
        <PathInfoBox
          path={sPath}
          pathType={'short'}
          selected={sPath.properties.id === selPathId} />
        <OpenPathBox
          pathType={'short'} />
      </PathRowFlex>
      {qPaths.map(path => (
        <PathRowFlex key={path.properties.id}>
          <PathInfoBox
            path={path}
            pathType={'quiet'}
            selected={path.properties.id === selPathId} />
          <OpenPathBox
            pathType={'quiet'} />
        </PathRowFlex>
      ))}
    </PathPanelContainer>
  )
}

const mapStateToProps = (state) => ({
  sPathFC: state.paths.sPathFC,
  qPathFC: state.paths.qPathFC,
  selPathFC: state.paths.selPathFC,
  detourLimit: state.paths.detourLimit,
  showingPaths: state.paths.showingPaths,
  pathStatsVisible: state.menu.pathStats,
})

const ConnectedPathPanel = connect(mapStateToProps, null)(PathPanel)
export default ConnectedPathPanel
