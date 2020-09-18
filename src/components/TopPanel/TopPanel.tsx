import React from 'react'
import styled from 'styled-components'
import Favicon from './favicon-32x32.png'
import RoutingSettingsRow from './RoutingSettingsRow'
import ShowInfoButton from './ShowInfoButton'
import OrigDestPanel from './OrigDestPanel'
import ToggleLayerSelector from './ToggleLayerSelector'

const Container = styled.div`
  background-color: rgba(255,255,255,0.98);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const LowerTransparentPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
    padding-bottom: 2px;
  }
  @media (min-width: 1100px) {    
    margin-bottom: -20px;
  }
`
const LogoImg = styled.img`
  @media (min-width: 600px) {
    width: 20px;
    height: auto;
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
          <LogoImg src={Favicon} width="15" height="15" alt='Green Paths app logo' />
          <GreenPathsLabel>Green<span style={{ marginLeft: '2px' }}>Paths</span></GreenPathsLabel>
        </LogoRow>
        <OrigDestPanel />
        <RoutingSettingsRow />
      </Container>
      <LowerTransparentPanel>
        <ShowInfoButton />
        <ToggleLayerSelector />
      </LowerTransparentPanel>
    </div>
  )
}

export default TopPanel
