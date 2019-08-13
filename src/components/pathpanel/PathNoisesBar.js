import React from 'react'
import styled, { css } from 'styled-components'
import { dBColors } from './../../constants'

const StyledNoiseBar = styled.div`
  display: flex;
  width: 94%;
  ${props => props.withMargins === true && css`
    margin: 3px 0px 3px 0px;
  `}
`
const StyledNoisePc = styled.div`
  height: 8px;
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.05), 0 3px 4px 0 rgba(0,0,0,0.01);
  width: ${props => props.pc || '0'}%;
  ${props => props.dB && css` background-color: ${dBColors[props.dB]};`}
`

export const PathNoisesBar = ({ noisePcts, withMargins }) => {
  const dBKeys = Object.keys(noisePcts)
  const dBs = dBKeys.map(dB => Number(dB)).sort()

  return (
    <StyledNoiseBar withMargins={withMargins}>
      {dBs.map(dB => <StyledNoisePc key={dB} dB={dB} pc={noisePcts[dB]} />)}
    </StyledNoiseBar>
  )
}
