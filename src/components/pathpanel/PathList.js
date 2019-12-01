import React, { createRef } from 'react'
import styled from 'styled-components'
import { pathTypes } from '../../constants'
import { OpenPathBox } from './OpenClosePathBoxes'
import PathListPathBox, { ShortestPathBox } from './PathListPathBox'
import DbColorLegendBar from '../guide/DbColorLegendBar'

const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`

class PathList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      linkVisible: true,
      pathRefs: { 'short_p': createRef() },
    }
  }

  componentDidUpdate(prevProps) {
    const { quietPathFC, cleanPathFC, showingPathsType } = this.props.paths
    let pathRefs = this.state.pathRefs
    let updateRefs = false

    const greenPathFC = showingPathsType === pathTypes.clean
      ? cleanPathFC
      : quietPathFC

    for (let feat of greenPathFC.features) {
      if (!(feat.properties.id in pathRefs)) {
        pathRefs[feat.properties.id] = createRef()
        updateRefs = true
      }
    }
    if (updateRefs) {
      console.log('update refs')
      this.setState({ pathRefs })
    }
    if (prevProps.scrollToPath !== this.props.scrollToPath) {
      this.state.pathRefs[this.props.scrollToPath].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  render() {
    const { paths, setSelectedPath, setOpenedPath } = this.props
    const { showingPathsType, showingStatsType, shortPathFC, cleanPathFC, quietPathFC, selPathFC, lengthLimit } = paths
    const selPathId = selPathFC.features.length > 0
      ? selPathFC.features[0].properties.id
      : 'none'

    const greenPathFC = showingPathsType === pathTypes.clean
      ? cleanPathFC
      : quietPathFC

    const shortPath = shortPathFC.features[0]
    const greenPaths = greenPathFC.features.filter(path => path.properties.length <= lengthLimit.limit)

    return (
      <div>
        <DbColorLegendBar />
        <PathRowFlex ref={this.state.pathRefs[shortPath.properties.id]}>
          <ShortestPathBox
            path={shortPath}
            handleClick={() => setSelectedPath(shortPath.properties.id)}
            showingPathsType={showingPathsType}
            showingStatsType={showingStatsType}
            selected={shortPath.properties.id === selPathId} />
          <OpenPathBox
            handleClick={() => setOpenedPath(shortPath)} />
        </PathRowFlex>
        {greenPaths.map((path) => (
          <PathRowFlex key={path.properties.id} ref={this.state.pathRefs[path.properties.id]}>
            <PathListPathBox
              path={path}
              showingPathsType={showingPathsType}
              showingStatsType={showingStatsType}
              handleClick={() => setSelectedPath(path.properties.id)}
              selected={path.properties.id === selPathId} />
            <OpenPathBox
              handleClick={() => setOpenedPath(path)} />
          </PathRowFlex>
        ))}
      </div>
    )
  }
}

export default PathList
