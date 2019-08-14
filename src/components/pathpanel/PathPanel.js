import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setSelectedPath, setOpenedPath, unsetOpenedPath } from './../../reducers/pathsReducer'
import PathList from './PathList'
import OpenedPathInfo from './OpenedPathInfo'

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

const PathPanel = (props) => {
  const { paths, pathPanelVisible, setSelectedPath, setOpenedPath, unsetOpenedPath } = props
  const { showingPaths, sPathFC, openedPath, } = paths

  if (!showingPaths || !pathPanelVisible) { return null }

  return (
    <PathPanelContainer>
      {!openedPath ?
        <PathList
          paths={paths}
          setSelectedPath={setSelectedPath}
          setOpenedPath={setOpenedPath} /> : null}
      {openedPath ?
        <OpenedPathInfo
          path={openedPath}
          sPath={sPathFC.features[0]}
          unsetOpenedPath={unsetOpenedPath} /> : null}
    </PathPanelContainer>
  )
}


const mapStateToProps = (state) => ({
  paths: state.paths,
  pathPanelVisible: state.menu.pathPanel,
})

const ConnectedPathPanel = connect(mapStateToProps, { setSelectedPath, setOpenedPath, unsetOpenedPath })(PathPanel)
export default ConnectedPathPanel
