import React from 'react'
import styled, { css } from 'styled-components'
import { Filter } from './Icons'

const StyledButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
  padding: 5px;
  display: table;
  color: black;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  ${props => props.disabled === true && css`
    color: #989898;
    pointer-events: none;
  `}
`

const FilterButton = ({ onClick, detourLimit, detourLimits }) => {
  const disabled = detourLimits.length <= 1
  return (
    <StyledButton disabled={disabled} onClick={onClick}> <Filter /> </StyledButton>
  )
}

export default FilterButton
