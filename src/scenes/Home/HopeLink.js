import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  bottom: 6px;
  left: 0px;
  right: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
`
const StyledHopeLink = styled.a`
  color: white;
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
`

const HopeLink = () => {
  return (
    <Container>
      <StyledHopeLink href='https://www.uia-initiative.eu/en/uia-cities/helsinki'
        target='_blank' rel='noopener noreferrer'>
        HOPE/UIA</StyledHopeLink>
    </Container>
  )
}

export default HopeLink
