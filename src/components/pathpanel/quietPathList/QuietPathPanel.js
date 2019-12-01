import React from 'react'
import { connect } from 'react-redux'
import { menu } from './../../../constants'
import { setSelectedPath, setOpenedPath, unsetOpenedPath } from './../../../reducers/pathsReducer'
import PathList from './PathList'
import OpenedPathInfo from './OpenedPathInfo'

const QuietPathPanel = (props) => {
  const { paths, scrollToPath, pathPanelContent } = props
  const { setSelectedPath, setOpenedPath, unsetOpenedPath } = props
  const { shortPathFC, openedPath } = paths

  const showingPathList = pathPanelContent === menu.pathList && !openedPath
  const showingOpenedPath = openedPath && !(pathPanelContent === menu.lengthLimitSelector)

  return (
    <div>
      {showingPathList ?
        <PathList
          paths={paths}
          scrollToPath={scrollToPath}
          setSelectedPath={setSelectedPath}
          setOpenedPath={setOpenedPath} /> : null}
      {showingOpenedPath ?
        <OpenedPathInfo
          path={openedPath}
          shortPath={shortPathFC.features[0]}
          unsetOpenedPath={unsetOpenedPath} /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  scrollToPath: state.pathList.scrollToPath,
  pathPanelContent: state.menu.pathPanelContent,
})

const mapDispatchToProps = {
  setSelectedPath,
  setOpenedPath,
  unsetOpenedPath,
}

const ConnectedQuietPathPanel = connect(mapStateToProps, mapDispatchToProps)(QuietPathPanel)
export default ConnectedQuietPathPanel
