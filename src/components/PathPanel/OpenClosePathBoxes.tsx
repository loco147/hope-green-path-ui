import React from 'react'
import styled, { css } from 'styled-components'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'

const iconStyle = `
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  font-size: 31px;
`
const ArrowForward = styled(IoIosArrowForward)`
  ${iconStyle}
`
const ArrowBack = styled(IoIosArrowBack)`
  ${iconStyle}
`
const IconButton = styled.div<{ padding?: string, leftMargin: string }>`
  padding: ${props => props.padding || '0px'};
  margin-left: ${props => props.leftMargin || '0px'};
  display: table;
  border-radius: 7px;
`
const ArrowForwardButton = () => {
  return (
    <IconButton
      leftMargin={'-3px'}> <ArrowForward />
    </IconButton>
  )
}

const ArrowBackButton = () => {
  return (
    <IconButton
      leftMargin={'-6px'}>
      <ArrowBack />
    </IconButton>
  )
}

const StyledOpenClosePathBox = styled.div<{ close?: any, disabled?: boolean }>`
  display: flex;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
  width: 21px;
  height: 48px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  margin: 4px 0px 4px 0px
  &:hover { 
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
  ${props => props.close && css`
    height: 36px;
  `}
  ${props => props.disabled === true && css`
    color: gray;
    cursor: default;
    pointer-events: none;
    &:hover {
      box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
    }
  `}
`

export const OpenPathBox = ({ disabled, handleClick }: { disabled: boolean, handleClick: React.MouseEventHandler<HTMLElement> }) => {
  return (
    <StyledOpenClosePathBox disabled={disabled} onClick={handleClick}>
      <ArrowForwardButton />
    </StyledOpenClosePathBox>
  )
}

export const ClosePathBox = ({ handleClick }: { handleClick: React.MouseEventHandler<HTMLElement> }) => {
  return (
    <StyledOpenClosePathBox close onClick={handleClick}>
      <ArrowBackButton />
    </StyledOpenClosePathBox>
  )
}
