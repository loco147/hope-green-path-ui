import React from 'react'
import styled, { css } from 'styled-components'
import { CloseButton } from '../Icons'

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
const StyledMaxLengthOption = styled.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 5px 10px;
  width: max-content;
  border-radius: 29px;
  margin: 3px 3px 3px 3px;
  background-color: white;
  border: 1px solid black;
  color: black;
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

const MaxLengthOption = ({ ll, selected, setLengthLimit }) => {
  return (
    <StyledMaxLengthOption selected={selected} onClick={() => setLengthLimit(ll)}>
      {ll.label}
    </StyledMaxLengthOption>
  )
}

const MaxLengthFilterSelector = ({ lengthLimit, lengthLimits, setLengthLimit, showPathList }) => {
  return (
    <OuterDiv>
      <FlexRow>
        <TooltipStyle>Filter paths by distance</TooltipStyle>
        <CloseButtonBox><CloseButton size={50} onClick={showPathList} /> </CloseButtonBox>
      </FlexRow>
      {lengthLimits.map(ll => (
        <MaxLengthOption
          key={ll.label}
          ll={ll}
          selected={lengthLimit.limit === ll.limit}
          setLengthLimit={setLengthLimit} />))}
    </OuterDiv>
  )
}

export default MaxLengthFilterSelector
