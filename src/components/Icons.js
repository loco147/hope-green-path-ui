import React from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import { FiFilter } from 'react-icons/fi'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'

const IconButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
`
export const IconDiv = styled.div`
  margin-left: ${props => props.leftMargin || '0px'};
  display: table;
  color: black;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
`
export const Star = styled(FaStar)`
  font-size: 13px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const Filter = styled(FiFilter)`
  font-size: 32px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const ArrowUp = styled(IoIosArrowUp)`
  font-size: 43px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const ArrowDown = styled(IoIosArrowDown)`
  font-size: 43px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const ArrowForward = styled(IoIosArrowForward)`
  font-size: 31px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const ArrowBack = styled(IoIosArrowBack)`
  font-size: 31px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`

export const FilterButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconDiv> <Filter /></IconDiv>
    </IconButton>
  )
}

export const ArrowUpButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconDiv> <ArrowUp /></IconDiv>
    </IconButton>
  )
}

export const ArrowDownButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconDiv> <ArrowDown /></IconDiv>
    </IconButton>
  )
}

export const ArrowForwardButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconDiv leftMargin={'-3px'}> <ArrowForward /></IconDiv>
    </IconButton>
  )
}

export const ArrowBackButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconDiv leftMargin={'-6px'}> <ArrowBack /></IconDiv>
    </IconButton>
  )
}
