import React from 'react'
import styled, { css } from 'styled-components'
import { dBColors } from './../../constants'

const FlexDbColorLabelPanel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: calc(100% - 5px);
  margin: 4px 0px 2px 0px;
  justify-content: center;
`
const DBColorLabelPair = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  white-space: nowrap;
`
const DBColorBox = styled.div`
  border-radius: 10px;
  margin: 0px 3px 0px 3px;
  padding: 5px 7px;
  font-size: 11px;
  font-weight: 450;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.06), 0 -6px 20px 0 rgba(0,0,0,0.03);
  background-color: ${props => props.color || 'black'};
  ${props => props.index && css`
    font-weight: 450;
    font-size: 13px;
    box-shadow: none;
    background-color: white;
    color: black;
  `}
`
const DbRow = styled.div`
  display: flex;
  margin-bottom: 6px;
`

const DBColorLabel = ({ dB, label }) => {
  return (
    <DBColorLabelPair>
      <DBColorBox color={dBColors[dB]}>{label}</DBColorBox>
    </DBColorLabelPair>
  )
}

const DbColorLegendBar = () => {
  return (
    <FlexDbColorLabelPanel>
      <DbRow>
        <DBColorLabelPair>
          <DBColorBox index>dB</DBColorBox>
        </DBColorLabelPair>
        <DBColorLabel dB={40} label='+40' />
        <DBColorLabel dB={50} label='+50' />
        <DBColorLabel dB={55} label='+55' />
      </DbRow>
      <DbRow>
        <DBColorLabel dB={60} label='+60' />
        <DBColorLabel dB={65} label='+65' />
        <DBColorLabel dB={70} label='+70' />
      </DbRow>
    </FlexDbColorLabelPanel>
  )
}

export default DbColorLegendBar
