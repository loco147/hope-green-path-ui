import React from 'react'
import styled from 'styled-components'
import { MdNearMe } from 'react-icons/md'

const Locate = styled(MdNearMe)`
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  font-size: 33px;
`
const StyledIcon = styled.div`
  cursor: pointer;
  pointer-events: auto;
  margin: 13px 0px;
  display: table;
  color: black;
  border-radius: 7px;
  @media (min-width: 600px) {
    &:hover { 
      margin-right: 2px;
    }
  }
`

export const LocateButton = ({ handleClick }) => {
  return (
    <StyledIcon onClick={handleClick}>
      <Locate />
    </StyledIcon>
  )
}
