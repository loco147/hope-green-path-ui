import React from 'react'
import styled from 'styled-components'
import { utils } from '../../utils/index'
import { dBColors } from './../../constants'

const StyledOpenedPathNoiseExps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;
  border-radius: 5px;
  margin: 4px 0px 4px 0px
  background-color: white;
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
const KeyValueFlex = styled.div`
  display: flex;
  margin: 0px;
  white-space: nowrap;
`
const DBKeyBox = styled.div`
  border-radius: 4px;
  margin: 2px 1px 2px 3px;
  color: black;
  font-size: 12px;
  padding: 2px 5px;
  background-color: ${props => props.color || 'black'};
`
const ExposureBox = styled.div`
  font-size: 12px;
  padding: 2px 2px;
  margin: 2px 2px 2px 1px;
  background-color: white;
  color: black;
`

export const OpenedPathNoiseExps = ({ path, pathType }) => {
  return (
    <StyledOpenedPathNoiseExps>
      <PathPropsRow>
        <FlexCols >
          <DBExposureRow path={path} dB={50} />
          <DBExposureRow path={path} dB={55} />
          <DBExposureRow path={path} dB={60} />
        </FlexCols>
        <FlexCols>
          <DBExposureRow path={path} dB={65} />
          <DBExposureRow path={path} dB={70} />
          <DBExposureRow path={path} dB={75} />
        </FlexCols>
      </PathPropsRow>
    </StyledOpenedPathNoiseExps>
  )
}

const DBExposureRow = ({ dB, path }) => {
  const dist = path.properties.noises[dB]
  return (
    <KeyValueFlex>
      <DBKeyBox color={dBColors[dB]}>{dB}dB</DBKeyBox>
      <ExposureBox>{utils.getWalkTimeFromDist(dist ? dist : 0)} min </ExposureBox>
    </KeyValueFlex>
  )
}
