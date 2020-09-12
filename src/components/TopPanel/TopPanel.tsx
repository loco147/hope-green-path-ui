import React from 'react'
import styled from 'styled-components'
import RoutingSettingsRow from './RoutingSettingsRow'
import ShowInfoButton from './ShowInfoButton'
import OrigDestPanel from './OrigDestPanel'
import Favicon from './favicon-32x32.png'

const Container = styled.div`
  background-color: rgba(255,255,255,0.98);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const LowerTransparentPanel = styled.div`
  display: flex;
  justify-content: flex-end;
`
const LogoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 4px 0px 9px;
`
const GreenPathsLabel = styled.div`
  font-size: 13px;
  margin-left: 3px;
  font-weight: 500;
  letter-spacing: -0.6px;
`

const TopPanel = () => {
  return (
    <div>
      <Container>
        <LogoRow>
          <img src={Favicon} width="14" height="14" alt='Green Paths app logo' />
          <GreenPathsLabel>Green<span style={{ marginLeft: '2px' }}>Paths</span></GreenPathsLabel>
        </LogoRow>
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
