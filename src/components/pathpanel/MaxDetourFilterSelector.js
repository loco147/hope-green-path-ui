import React from 'react'
import styled, { css } from 'styled-components'
import { CloseButton } from './../Icons'

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const FlexRow = styled.div`
  display: flex;
  align-items: center;
`
const CloseButtonBox = styled.div`
  margin: 1px -10px 4px 5px;
`
const TooltipStyle = styled.div`
  font-weight: 500;
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
  border-radius: 29px;
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

const MaxDetourFilterSelector = ({ detourLimit, detourLimits, setDetourLimit, showPathList }) => {
  return (
    <OuterDiv>
      <FlexRow>
        <TooltipStyle> Filter paths by selecting <br />maximum detour distance</TooltipStyle>
        <CloseButtonBox><CloseButton size={50} onClick={showPathList} /> </CloseButtonBox>
      </FlexRow>
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
