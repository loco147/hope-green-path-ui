import React from 'react'
import styled from 'styled-components'
import { PathNoisesBar } from './PathNoisesBar'
import { OpenedPathNoiseStats } from './OpenedPathNoiseStats'
import { ClosePathBox } from './OpenClosePathBoxes'

const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`
const NoiseBarsFlex = styled.div`
  display: flex;
  width: calc(90% - 21px);
  min-height: 56px;
  flex-direction: column;
  justify-content: space-around;
  margin: 3px 0px 1px 0px;
`
const BarsLabel = styled.div`
  font-size: 14px;
  margin: 1px 0px 5px 0px;
`

const OpenedPathInfo = ({ path, shortPath, unsetOpenedPath }) => {
  if (path.properties.type === 'short') {
    return <OpenedShortPathInfo path={path} unsetOpenedPath={unsetOpenedPath} />
  } else {
    return <OpenedQuietPathInfo path={path} shortPath={shortPath} unsetOpenedPath={unsetOpenedPath} />
  }
}

export const OpenedQuietPathInfo = ({ path, shortPath, unsetOpenedPath }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected and the shortest path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
          <PathNoisesBar withMargins={true} noisePcts={shortPath.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex >
      <OpenedPathNoiseStats path={path} shortPath={shortPath} pathType='quiet' />
    </div>
  )
}

export const OpenedShortPathInfo = ({ path, unsetOpenedPath }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected (shortest) path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex>
      <OpenedPathNoiseStats path={path} pathType='short' />
    </div>
  )
}

export default OpenedPathInfo
