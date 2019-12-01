import React from 'react'
import styled from 'styled-components'
import { utils } from '../../utils/index'
import { aqiLabels, aqiColors } from './../../constants'

const StyledOpenedPathExposures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;
  border-radius: 5px;
  margin: 4px 0px 4px 0px
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  width: 95%;
  margin: auto;
`
const PathPropsRow = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  width: 100%;
`
const FlexCols = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 1px 0px 1px;
  justify-content: space-evenly;
`
const StyledAqiLabelBox = styled.div`
  border-radius: 8px;
  margin: 0px 3px 0px 3px;
  padding: 5px 7px;
  background-color: ${props => aqiColors[props.aqiCl] || 'grey'};
`
const StyledAqiExposureBox = styled.div`
  border-radius: 8px;
  margin: 0px 3px 0px 3px;
  padding: 5px 7px;
`
const StyledAqiExposureRow = styled.div`
  display: fled;
  flex-direction: column;

`

const AqiClLabelBox = ({ aqiCl }) => {
  return (
    <StyledAqiLabelBox aqiCl={aqiCl}>
      {aqiLabels[aqiCl]}
    </StyledAqiLabelBox>
  )
}

const AqExposureRow = ({ aqiCl, aqiClExp }) => {
  return (
    <StyledAqiExposureRow>
      <AqiClLabelBox aqiCl={aqiCl} />
      <StyledAqiExposureBox>
        {utils.getWalkTimeFromDist(aqiClExp)} min
      </StyledAqiExposureBox>
    </StyledAqiExposureRow>
  )
}

export const OpenedPathAqExps = ({ path, pathType }) => {
  const aqiClExps = path.properties.aqi_cl_exps
  console.log('aqiClExps', aqiClExps)
  const aqiKeys = Object.keys(aqiClExps)
  const aqiCls = aqiKeys.map(aqi => Number(aqi)).sort()
  return (
    <StyledOpenedPathExposures>
      <StyledOpenedPathExposures>
        <PathPropsRow>
          <FlexCols>
            {aqiCls.map(aqiCL => <AqExposureRow
              key={aqiCL}
              aqiCl={aqiCL}
              aqiClExp={aqiClExps[aqiCL]} />)}
          </FlexCols>
        </PathPropsRow>
      </StyledOpenedPathExposures>
    </StyledOpenedPathExposures>
  )
}
