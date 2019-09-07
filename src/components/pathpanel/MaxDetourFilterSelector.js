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
  padding: 5px 10px;
  width: max-content;
  border-radius: 29px;
  margin: 3px 3px 3px 3px;
  background-color: white;
  border: 1px solid black;
  color: black
  ${props => props.selected === true && css`
    background-color: #0b5d21;
    border-color: #0b5d21;
    color: white;
  `}
  @media (min-width: 600px) {
    &:hover { 
      margin-left: 6px;
    }
  }
`

const MaxDetourOption = ({ dl, selected, setDetourLimit }) => {
  return (
    <StyledMaxDetourOption selected={selected} onClick={() => setDetourLimit(dl)}>
      {dl.label}
    </StyledMaxDetourOption>
  )
}

const MaxDetourFilterSelector = ({ detourLimit, detourLimits, setDetourLimit, showPathList }) => {
  return (
    <OuterDiv>
      <FlexRow>
        <TooltipStyle> Filter quiet paths by selecting <br />maximum detour distance</TooltipStyle>
        <CloseButtonBox><CloseButton size={50} onClick={showPathList} /> </CloseButtonBox>
      </FlexRow>
      {detourLimits.map(dl => (
        <MaxDetourOption
          key={dl.label}
          dl={dl}
          selected={detourLimit.limit === dl.limit}
          setDetourLimit={setDetourLimit} />))}
    </OuterDiv>
  )
}

export default MaxDetourFilterSelector
