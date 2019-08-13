import React from 'react'
import styled from 'styled-components'
import { dBColors } from './../../constants'

const FlexDbColorLabelPanel = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px 1px 0px;
`
const DBColorLabelColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const DBColorLabelPair = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  white-space: nowrap;
`
const DBColorBox = styled.div`
  border-radius: 4px;
  margin: 5px 2px 5px 5px;
  padding: 9px 14px;
  background-color: ${props => props.color || 'black'};
`
const DBLabel = styled.div`
  border-radius: 4px;
  margin: 2px 1px 2px 0px;
  padding: 2px 5px;
  font-weight: 400;
`
const DBColorLabel = ({ dB, label }) => {
  return (
    <DBColorLabelPair>
      <DBColorBox color={dBColors[dB]} />
      <DBLabel>{label} </DBLabel>
    </DBColorLabelPair>
  )
}

const DbColorLegend = () => {
  return (
    <FlexDbColorLabelPanel>
      <DBColorLabelColumn>
        <DBColorLabel dB={40} label='40-50 dB' />
        <DBColorLabel dB={50} label='50-55 dB' />
        <DBColorLabel dB={55} label='55-60 dB' />
      </DBColorLabelColumn>
      <DBColorLabelColumn>
        <DBColorLabel dB={60} label='60-65 dB' />
        <DBColorLabel dB={65} label='65-70 dB' />
        <DBColorLabel dB={70} label='70-80 dB' />
      </DBColorLabelColumn>
    </FlexDbColorLabelPanel>
  )
}

export default DbColorLegend
