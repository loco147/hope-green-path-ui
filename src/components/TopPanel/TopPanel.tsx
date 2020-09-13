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
  font-weight: 500;
  font-size: 13px;
  padding: 6px 4px 0px 9px;
  @media (min-width: 600px) {
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 450;
    padding: 6px 4px 1px 9px;
  }
`
const GreenPathsLabel = styled.div`
  margin-left: 3px;
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
