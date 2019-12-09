import React from 'react'
import styled from 'styled-components'

export const Button = styled.div`
  cursor: pointer;
  padding: 3px 8px;
  margin: 0px 0px 12px 5px;
  color: black;
  border-radius: 5px;
  border: 2px solid #1b1b1b;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  width: max-content;
  letter-spacing: 1px;
  max-width: 90%;
  overflow: auto;
  height: auto;
  pointer-events: auto;
  background-color: white;
  @media (min-width: 600px) {
    &:hover { 
        margin-right: 2px;
    }
  }
`

const ResetPathsButton = ({ handleClick }) => <Button onClick={handleClick}>Reset</Button>

export default ResetPathsButton
