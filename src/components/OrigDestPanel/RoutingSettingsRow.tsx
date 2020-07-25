import React from 'react'
import styled from 'styled-components'
import TravelModeSelector from './TravelModeSelector'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 4px 5px;
`

const RoutingSettingsRow = () => {
  return (
    <Container>
      <TravelModeSelector />
    </Container>
  )
}

export default RoutingSettingsRow