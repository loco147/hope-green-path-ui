import React from 'react'
import styled, { css } from 'styled-components'

const StyledNoiseBar = styled.div`
  display: flex;
  width: 94%;
`
const StyledNoisePc = styled.div`
  height: 8px;
  width: ${props => props.pc || '0'}%;
  ${props => props.dB === 40 && css` background-color: #00EC00;`}
  ${props => props.dB === 50 && css` background-color: #56FF3B;`}
  ${props => props.dB === 55 && css` background-color: #C6F519;`}
  ${props => props.dB === 60 && css` background-color: #FFD000;`}
  ${props => props.dB === 65 && css` background-color: #FF6E1B;`}
  ${props => props.dB === 70 && css` background-color: #FF270E;`}
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.05), 0 3px 4px 0 rgba(0,0,0,0.01);
`

export const PathNoisesBar = ({ noisePcts }) => {
  const dBKeys = Object.keys(noisePcts)
  const dBs = dBKeys.map(dB => Number(dB)).sort()

  return (
    <StyledNoiseBar>
      {dBs.map(dB => (
        <StyledNoisePc key={dB} dB={dB} pc={noisePcts[dB]} />
      ))}
    </StyledNoiseBar>
  )
}
