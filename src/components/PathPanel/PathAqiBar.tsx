import React from 'react'
import styled, { css } from 'styled-components'
import { aqiColors } from '../../constants'

const StyledAqiBar = styled.div<{ withMargins?: boolean }>`
  display: flex;
  width: 94%;
  ${props => props.withMargins === true && css`
    margin: 3px 0px 3px 0px;
  `}
`
const StyledAqPc = styled.div<{ pc: number, aqiCl: AqiClass }>`
  height: 8px;
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.05), 0 3px 4px 0 rgba(0,0,0,0.01);
  width: ${props => props.pc || '0'}%;
  background-color: ${props => aqiColors[props.aqiCl] || 'grey'};
`

interface Props {
  aqiPcts: { [key in AqiClass]: number },
  withMargins?: boolean
}

export const PathAqiBar = ({ aqiPcts, withMargins }: Props) => {
  const aqiKeys = Object.keys(aqiPcts)
  const aqis: AqiClass[] = aqiKeys.map(aqi => Number(aqi)).sort()

  return (
    <StyledAqiBar withMargins={withMargins}>
      {aqis.map(aqiCl => <StyledAqPc key={aqiCl} aqiCl={aqiCl} pc={aqiPcts[aqiCl]} />)}
    </StyledAqiBar>
  )
}
