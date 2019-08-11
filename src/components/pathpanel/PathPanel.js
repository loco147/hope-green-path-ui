import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { PathInfoBox, OpenPathBox, ClosePathBox } from './PathInfoBox'
import { setSelectedPath, setOpenedPath, unsetOpenedPath } from './../../reducers/pathsReducer'

const PathPanelContainer = styled.div`
  margin: 0px;
  background: rgba(255,255,255,0.95);
  overflow: auto;
  width: auto;
  max-height: 184px;
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

const OpenedPathPanel = ({ path, unsetOpenedPath }) => {
  return (
    <PathPanelContainer>
      <PathRowFlex>
        <ClosePathBox
          handleClick={unsetOpenedPath} />
        <PathInfoBox
          path={path}
          pathType={path.properties.type}
          selected={false} />
      </PathRowFlex>
    </PathPanelContainer>
  )
}

const PathPanel = ({ paths, pathStatsVisible, setSelectedPath, setOpenedPath, unsetOpenedPath }) => {
  const { showingPaths, sPathFC, qPathFC, selPathFC, openedPath, detourLimit } = paths

  if (!showingPaths || !pathStatsVisible) { return null }

  const selPathId = selPathFC.features.length > 0
    ? selPathFC.features[0].properties.id
    : 'none'

  const sPath = sPathFC.features[0]
  const qPaths = qPathFC.features.filter(path => path.properties.len_diff < detourLimit)

  if (openedPath) {
    return (<OpenedPathPanel path={openedPath} unsetOpenedPath={unsetOpenedPath} />)
  } else {
    return (
      <PathPanelContainer>
        <PathRowFlex>
          <PathInfoBox
            path={sPath}
            handleClick={() => setSelectedPath(sPath.properties.id)}
            pathType={'short'}
            selected={sPath.properties.id === selPathId} />
          <OpenPathBox
            handleClick={() => setOpenedPath(sPath)} />
        </PathRowFlex>
        {qPaths.map(path => (
          <PathRowFlex key={path.properties.id}>
            <PathInfoBox
              path={path}
              handleClick={() => setSelectedPath(path.properties.id)}
              pathType={'quiet'}
              selected={path.properties.id === selPathId} />
            <OpenPathBox
              handleClick={() => setOpenedPath(path)} />
          </PathRowFlex>
        ))}
      </PathPanelContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  pathStatsVisible: state.menu.pathStats,
})

const ConnectedPathPanel = connect(mapStateToProps, { setSelectedPath, setOpenedPath, unsetOpenedPath })(PathPanel)
export default ConnectedPathPanel
