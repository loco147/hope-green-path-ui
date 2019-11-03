import React, { createRef } from 'react'
import styled from 'styled-components'
import PathListPathBox from './PathListPathBox'
import { OpenPathBox } from './OpenClosePathBoxes'
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
    const { qPathFC } = this.props.paths
    let pathRefs = this.state.pathRefs
    let updateRefs = false

    for (let feat of qPathFC.features) {
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
    const { sPathFC, qPathFC, selPathFC, lengthLimit } = paths
    const selPathId = selPathFC.features.length > 0
      ? selPathFC.features[0].properties.id
      : 'none'

    const sPath = sPathFC.features[0]
    const qPaths = qPathFC.features.filter(path => path.properties.length <= lengthLimit.limit)

    return (
      <div>
        <DbColorLegendBar />
        <PathRowFlex ref={this.state.pathRefs[sPath.properties.id]}>
          <PathListPathBox
            path={sPath}
            handleClick={() => setSelectedPath(sPath.properties.id)}
            pathType={'short'}
            selected={sPath.properties.id === selPathId} />
          <OpenPathBox
            handleClick={() => setOpenedPath(sPath)} />
        </PathRowFlex>
        {qPaths.map((path) => (
          <PathRowFlex key={path.properties.id} ref={this.state.pathRefs[path.properties.id]}>
            <PathListPathBox
              path={path}
              handleClick={() => setSelectedPath(path.properties.id)}
              pathType={'quiet'}
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
