import React from 'react'
import styled from 'styled-components'
import PathListPathBox from './PathListPathBox'
import { OpenPathBox } from './OpenClosePathBoxes'

const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`

const PathList = ({ paths, setSelectedPath, setOpenedPath }) => {
  const { sPathFC, qPathFC, selPathFC, detourLimit } = paths

  const selPathId = selPathFC.features.length > 0
    ? selPathFC.features[0].properties.id
    : 'none'

  const sPath = sPathFC.features[0]
  const qPaths = qPathFC.features.filter(path => path.properties.len_diff < detourLimit.limit)
  return (
    <div>
      <PathRowFlex>
        <PathListPathBox
          path={sPath}
          handleClick={() => setSelectedPath(sPath.properties.id)}
          pathType={'short'}
          selected={sPath.properties.id === selPathId} />
        <OpenPathBox
          handleClick={() => setOpenedPath(sPath)} />
      </PathRowFlex>
      {qPaths.map((path, index) => (
        <PathRowFlex key={path.properties.id}>
          <PathListPathBox
            path={path}
            index={index}
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

export default PathList
