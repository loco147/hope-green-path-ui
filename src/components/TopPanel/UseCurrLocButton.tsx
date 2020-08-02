import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  margin: -4px 0px -4px 8px;
  color: white;
  border-radius: 25px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  width: max-content;
  letter-spacing: 1px;
  max-width: 90%;
  overflow: auto;
  height: auto;
  pointer-events: auto;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  background-color: #23a50d;
  @media (min-width: 600px) {
    &:hover { 
      background-color: #188007;
    }
  }
`

type Props = {
  handleClick: React.MouseEventHandler<HTMLElement>
}

const UseCurrLocButton = ({ handleClick }: Props) => <Button onClick={handleClick}>Use current location</Button>

export default UseCurrLocButton
