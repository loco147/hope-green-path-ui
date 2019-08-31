import React from 'react'
import styled, { css } from 'styled-components'
import { Filter } from './Icons'

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  padding: 5px;
  margin-right: -30px;
  color: black;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  ${props => props.disabled === true && css`
    color: #989898;
    pointer-events: none;
  `}
`
const FilterCount = styled.div`
  letter-spacing: 1px;
  font-size: 14px;
  margin-left: 1px;
`

const FilterButton = ({ onClick, qPathCount, detourLimit, detourLimits }) => {
  const disabled = detourLimits.length <= 1
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}>
      <Filter />
      <FilterCount>{detourLimit.count + 1}/{qPathCount + 1}</FilterCount>
    </StyledButton>
  )
}

export default FilterButton
