import React from 'react'
import styled from 'styled-components'
import RoutingSettingsRow from './RoutingSettingsRow'
import ShowInfoButton from './ShowInfoButton'
import OrigDestPanel from './OrigDestPanel'

const Container = styled.div`
  background-color: rgba(255,255,255,0.98);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const LowerTransparentPanel = styled.div`
  display: flex;
  justify-content: flex-end;
`

const TopPanel = () => {
  return (
    <div>
      <Container>
        <OrigDestPanel />
        <RoutingSettingsRow />
      </Container>
      <LowerTransparentPanel>
        <ShowInfoButton />
      </LowerTransparentPanel>
    </div>
  )
}

export default TopPanel
