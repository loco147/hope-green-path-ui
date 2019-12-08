import React from 'react'
import { connect } from 'react-redux'
import { menu } from '../../constants'
import { setSelectedPath, setOpenedPath, unsetOpenedPath } from '../../reducers/pathsReducer'
import PathList from './PathList/PathList'
import OpenedPathInfo from './OpenedPathInfo/OpenedPathInfo'

const PathInfoPanel = (props) => {
  const { paths, scrollToPath, pathPanelContent } = props
  const { setSelectedPath, setOpenedPath, unsetOpenedPath } = props
  const { shortPathFC, openedPath, showingPathsType, showingStatsType } = paths

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
          showingPathsType={showingPathsType}
          showingStatsType={showingStatsType}
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

const ConnectedPathInfoPanel = connect(mapStateToProps, mapDispatchToProps)(PathInfoPanel)
export default ConnectedPathInfoPanel
