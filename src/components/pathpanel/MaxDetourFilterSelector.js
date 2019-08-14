import React from 'react'
import styled, { css } from 'styled-components'

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TooltipStyle = styled.div`
  font-weight: 550;
  text-align: center;
  margin: 2px 0px 7px 0px;
`
const StyledMaxDetourOption = styled.div`
  pointer-events: auto;
  cursor: pointer;
  background-color: #3c3c3c;
  border: 1px solid #3c3c3c;
  padding: 5px 10px;
  width: max-content;
  color: white;
  border-radius: 5px;
  margin: 3px 3px 3px 3px;
  ${props => props.selected === true && css`
    background-color: white;
    border-color: black;
    color: black
  `}
`

const MaxDetourOption = ({ dl, selected, setDetourLimit }) => {
  console.log('selected', selected)
  return (
    <StyledMaxDetourOption selected={selected} onClick={() => setDetourLimit(dl.limit)}>
      {dl.label}
    </StyledMaxDetourOption>
  )
}

const MaxDetourFilterSelector = ({ detourLimit, detourLimits, setDetourLimit }) => {
  console.log('detourLimit', detourLimit)
  console.log('detourLimits', detourLimits)
  return (
    <OuterDiv>
      <TooltipStyle> Filter paths by selecting <br />maximum detour distance</TooltipStyle>
      {detourLimits.map(dl => (
        <MaxDetourOption
          key={dl.label}
          dl={dl}
          selected={detourLimit === dl.limit}
          setDetourLimit={setDetourLimit} />))}
    </OuterDiv>
  )
}

export default MaxDetourFilterSelector
