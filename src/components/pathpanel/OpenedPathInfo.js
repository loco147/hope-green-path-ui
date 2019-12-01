import React from 'react'
import styled from 'styled-components'
import { PathNoisesBar } from './PathNoisesBar'
import { PathAqiBar } from './PathAqiBar'
import { OpenedPathNoiseExps } from './OpenedPathNoiseExps'
import { OpenedPathAqExps } from './OpenedPathAqExps'
import { ClosePathBox } from './OpenClosePathBoxes'
import { pathTypes, statTypes } from './../../constants'

const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`
const ExposureBarsFlex = styled.div`
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

const OpenedPathInfo = ({ path, shortPath, unsetOpenedPath, showingStatsType, showingPathsType }) => {
  if (path.properties.type === pathTypes.short) {
    if (showingStatsType === statTypes.aq) {
      return <ShortPathAqiExposures path={path} unsetOpenedPath={unsetOpenedPath} />
    } else {
      return <ShortPathNoiseExposures path={path} unsetOpenedPath={unsetOpenedPath} />
    }
  } else if (showingStatsType === statTypes.aq) {
    return <PathAqiExposures path={path} shortPath={shortPath} unsetOpenedPath={unsetOpenedPath} showingPathsType={showingPathsType} />
  } else {
    return <PathNoiseExposures path={path} shortPath={shortPath} unsetOpenedPath={unsetOpenedPath} showingPathsType={showingPathsType} />
  }
}

const PathAqiExposures = ({ path, shortPath, unsetOpenedPath, showingPathsType }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different air quality classes on the selected and the shortest path: </BarsLabel>
          <PathAqiBar withMargins={true} aqiPcts={path.properties.aqi_pcts} />
          <PathAqiBar withMargins={true} aqiPcts={shortPath.properties.aqi_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex >
      <OpenedPathAqExps path={path} pathType={showingPathsType} />
    </div>
  )
}

const PathNoiseExposures = ({ path, shortPath, unsetOpenedPath, showingPathsType }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected and the shortest path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
          <PathNoisesBar withMargins={true} noisePcts={shortPath.properties.noise_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex >
      <OpenedPathNoiseExps path={path} shortPath={shortPath} pathType={showingPathsType} />
    </div>
  )
}

const ShortPathAqiExposures = ({ path, unsetOpenedPath }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different air quality classes on the selected (shortest) path: </BarsLabel>
          <PathAqiBar withMargins={true} aqiPcts={path.properties.aqi_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex>
      <OpenedPathAqExps path={path} pathType={pathTypes.short} />
    </div>
  )
}

const ShortPathNoiseExposures = ({ path, unsetOpenedPath }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <ExposureBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected (shortest) path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </ExposureBarsFlex>
      </PathRowFlex>
      <OpenedPathNoiseExps path={path} pathType={pathTypes.short} />
    </div>
  )
}

export default OpenedPathInfo
