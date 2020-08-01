import React from 'react'
import styled from 'styled-components'
import { utils } from '../../../utils/index'
import { PathNoisesBar } from './../PathNoisesBar'
import { PathAqiBar } from './../PathAqiBar'
import { ExposureMode, TravelMode, statTypes, walkSpeed, bikeSpeed, aqiLabels } from '../../../constants'

type Props = {
  selected: boolean,
  children: any
}

const StyledPathListPathBox = styled.div.attrs((props: Props) => ({
  style:
    ({
      border: props.selected ? '2px solid black' : '',
      boxShadow: props.selected ? '0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.25)' : ''
    })
})) <Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;
  height: 48px;
  border-radius: 5px;
  margin: 4px 0px 4px 0px;
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  width: calc(88% - 21px);
  &:hover { 
    cursor: pointer;
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
`
const PathPropsRow = styled.div<{ color?: string }>`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  font-weight: 500;
  width: 96%;
  color: ${props => props.color || '#3c3c3c'};
`
const QuietPathLengthProps = styled.div`
  margin-left: 2px;
  text-align: center;
`
const Sub = styled.sub`
  font-size: 9px;
`

interface PathBoxProperties {
  path: PathFeature,
  selected: boolean,
  handleClick: React.MouseEventHandler<HTMLElement>,
  travelMode: TravelMode,
  showingPathsOfExposureMode?: ExposureMode,
  showingStatsType?: StatsType
}

const getNoiseIndexLabel = (ni: number): string | undefined => {
  if (ni < 0.15) return 'very quiet'
  if (ni < 0.3) return 'quiet'
  if (ni < 0.5) return 'moderate noise'
  if (ni < 0.65) return 'high noise'
  if (ni < 0.75) return 'very high noise'
  if (ni >= 0.75) return 'extreme noise'
}

const getAqiLabel = (aqi: number): string => {
  if (aqi <= 0) return ''
  if (aqi <= 2.0) return aqiLabels[1]
  if (aqi <= 3.0) return aqiLabels[2]
  if (aqi <= 4.0) return aqiLabels[3]
  if (aqi <= 5.0) return aqiLabels[4]
  if (aqi > 5.0) return aqiLabels[5]
  return ''
}

const roundTo = (number: number, digits: number): number => {
  return Math.round(number * (10 * digits)) / (10 * digits)
}

const concatSign = (number: number): string => {
  if (number < 0) {
    return '-' + String(number)
  } else if (number > 0) {
    return '+' + String(number)
  } else return String(number)
}

const getFormattedDistanceString = (m: number, withSign: boolean = false): string => {
  let distance
  let unit
  if (Math.abs(m) >= 950) {
    const km = m / 1000
    distance = roundTo(km, 1)
    unit = ' km'
  } else if (Math.abs(m) > 60) {
    distance = Math.round(m / 10) * 10
    unit = ' m'
  } else {
    distance = Math.round(m)
    unit = ' m'
  }
  const distanceString = withSign === true ? concatSign(distance) : String(distance)
  return distanceString + unit
}

const getFormattedExpDiffRatio = (aqc_diff_rat: number): string => {
  const diff = Math.round(aqc_diff_rat)
  if (diff === 0) {
    return '-' + String(diff)
  } else if (diff > 0) {
    return '+' + String(diff)
  } else {
    return String(diff)
  }
}

const PathListPathBox = ({ path, selected, showingPathsOfExposureMode, travelMode, handleClick }: PathBoxProperties) => {
  if (showingPathsOfExposureMode === ExposureMode.CLEAN) {
    return <CleanPathBox path={path} selected={selected} travelMode={travelMode} handleClick={handleClick} />
  } else {
    return <QuietPathBox path={path} selected={selected} travelMode={travelMode} handleClick={handleClick} />
  }
}

export const ShortestPathBox = ({ path, selected, showingStatsType, travelMode, handleClick }: PathBoxProperties) => {
  if (showingStatsType === statTypes.aq) {
    return <ShortestPathAqBox path={path} selected={selected} travelMode={travelMode} handleClick={handleClick} />
  } else { return <ShortestPathNoiseBox path={path} selected={selected} travelMode={travelMode} handleClick={handleClick} /> }
}

const ShortestPathAqBox = ({ path, selected, travelMode, handleClick }: PathBoxProperties) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      {!path.properties.missing_aqi && <PathAqiBar aqiPcts={path.properties.aqi_pcts} />}
      <PathPropsRow>
        <div>
          {utils.getDurationStringFromDist(path.properties.length, travelMode)}
        </div>
        <div>
          {getFormattedDistanceString(path.properties.length, false)}
        </div>
        {!path.properties.missing_aqi &&
          <div>
            {getAqiLabel(path.properties.aqi_m)} air quality
          </div>}
        {path.properties.missing_aqi && <div>No AQ data available</div>}
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const ShortestPathNoiseBox = ({ path, selected, travelMode, handleClick }: PathBoxProperties) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <div>
          {utils.getDurationStringFromDist(path.properties.length, travelMode)}
        </div>
        <div>
          {getFormattedDistanceString(path.properties.length, false)}
        </div>
        <div>
          {getNoiseIndexLabel(path.properties.nei_norm)}
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const CleanPathBox = ({ path, selected, travelMode, handleClick }: PathBoxProperties) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      {!path.properties.missing_aqi && <PathAqiBar aqiPcts={path.properties.aqi_pcts} />}
      <PathPropsRow>
        <div>
          {utils.getDurationStringFromDist(path.properties.length, travelMode)}
          <Sub>
            {' '}{getFormattedDurationDiff(path.properties, travelMode)}
          </Sub>
        </div>
        <QuietPathLengthProps>
          {getFormattedDistanceString(path.properties.length, false)}
        </QuietPathLengthProps>
        {!path.properties.missing_aqi &&
          <div>
            {getAqiLabel(path.properties.aqi_m)} air quality
          </div>}
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const QuietPathBox = ({ path, selected, travelMode, handleClick }: PathBoxProperties) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <div>
          {utils.getDurationStringFromDist(path.properties.length, travelMode)}
          <Sub>
            {' '}{getFormattedDurationDiff(path.properties, travelMode)}
          </Sub>
        </div>
        <QuietPathLengthProps>
          {getFormattedDistanceString(path.properties.length, false)}
        </QuietPathLengthProps>
        <div>
          {getFormattedExpDiffRatio(path.properties.nei_diff_rat) + ' % noise'}
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const getFormattedDurationDiff = (pathProps: PathProperties, travelMode: TravelMode) => {
  const speed = travelMode === TravelMode.WALK ? walkSpeed : bikeSpeed
  const sPathLength = pathProps.length - pathProps.len_diff
  const sPathDurationMins = Math.round((sPathLength / speed) / 60)
  const cleanPathDurationMins = Math.round((pathProps.length / speed) / 60)
  const durationDiffMins = cleanPathDurationMins - sPathDurationMins
  if (durationDiffMins === 0) { return '' }
  else if (durationDiffMins > 0) {
    return '+' + String(durationDiffMins) + ' min'
  } else {
    return String(durationDiffMins) + ' min'
  }
}

export default PathListPathBox
