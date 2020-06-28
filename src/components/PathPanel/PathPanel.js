import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { menu } from './../../constants'
import { setLengthLimit } from './../../reducers/pathsReducer'
import { showPathList } from './../../reducers/menuReducer'
import MaxLengthFilterSelector from './MaxLengthFilterSelector'
import PathInfoPanel from './PathInfoPanel'
import LoadAnimation from './../LoadAnimation/LoadAnimation'

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
  ${props => props.showingOpenedPath === true && css`
    max-height: calc(100vh - 121px);
    height: min-content;
  `}
`
const LoadAnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0px 20px 0px;
`

const PathPanel = (props) => {
  const { paths, pathPanelVisible, pathPanelContent } = props
  const { setLengthLimit, showPathList } = props
  const { waitingPaths, showingPaths, openedPath, lengthLimit, lengthLimits } = paths

  if (waitingPaths) {
    return (
      <PathPanelContainer>
        <LoadAnimationContainer>
          <LoadAnimation size={57} />
        </LoadAnimationContainer>
      </PathPanelContainer>
    )
  }

  if (!showingPaths || !pathPanelVisible) return null

  const showingOpenedPath = openedPath && !(pathPanelContent === menu.lengthLimitSelector)

  return (
    <PathPanelContainer showingOpenedPath={showingOpenedPath}>
      {pathPanelContent === menu.lengthLimitSelector ?
        <MaxLengthFilterSelector
          lengthLimit={lengthLimit}
          lengthLimits={lengthLimits}
          setLengthLimit={setLengthLimit}
          showPathList={showPathList} /> : null}
      <PathInfoPanel />
    </PathPanelContainer>
  )
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  scrollToPath: state.pathList.scrollToPath,
  pathPanelVisible: state.menu.pathPanel,
  pathPanelContent: state.menu.pathPanelContent,
})

const mapDispatchToProps = {
  setLengthLimit,
  showPathList,
}

const ConnectedPathPanel = connect(mapStateToProps, mapDispatchToProps)(PathPanel)
export default ConnectedPathPanel
