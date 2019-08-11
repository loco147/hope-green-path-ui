import React from 'react'
import styled, { css } from 'styled-components'
import { ArrowForwardButton, ArrowBackButton } from './../Icons'

const StyledOpenClosePathBox = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto;
  height: 48px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  margin: 4px 0px 4px 0px
  &:hover { 
    cursor: pointer;
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
  width: 21px;
  ${props => props.close && css`
    height: 36px;
  `}
`

export const OpenPathBox = ({ handleClick }) => {
  return (
    <StyledOpenClosePathBox onClick={handleClick}>
      <ArrowForwardButton />
    </StyledOpenClosePathBox>
  )
}

export const ClosePathBox = ({ handleClick }) => {
  return (
    <StyledOpenClosePathBox close onClick={handleClick}>
      <ArrowBackButton />
    </StyledOpenClosePathBox>
  )
}
