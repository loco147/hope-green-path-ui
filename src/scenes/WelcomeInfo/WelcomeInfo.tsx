import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { showInfo, hideInfo, Lang } from './../../reducers/uiReducer'
import HopeLogo from '../Images/Hope_black_url.png'
import ERDF from '../Images/ERDF.png'
import HYLogo from '../Images/Helsingin_yliopisto.png'
import ToggleLanguageButtons from './ToggleLanguageButtons'
import T from '../../utils/translator/Translator'

const InfoContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  pointer-events: none;
`
const FlexDiv = styled.div`
  align-self: center;
  width: 460px;
  max-width: 85%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`
const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.6px;
  padding: 18px 27px 5px 27px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-weight: 300;
  color: black;
  font-size: 14px;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.22), 0 6px 20px 0 rgba(0,0,0,0.14);
`
const InfoWrapper = styled.div`
  max-height: 68vh;
  overflow: auto;
`
const Title = styled.div`
  font-weight: 300;
  font-size: 21px;
  padding: 9px 0 11px 0;
`
const SubHeading = styled.div`
  margin: 7px 0px 0px 0px;
  font-weight: 550;
`
const P = styled.div`
  padding: 7px 0px 5px 0;
  line-height: 1.3;
  font-weight: 350;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: rgb(40, 40, 40);
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 0 5px 0px;
`
const Green = styled.span`
  color: #00d000;
`
const Link = styled.a`
  color: black;
`
const LogoFlex = styled.div`
  display: flex;
  margin: 27px 0px 4px 0px;
  align-items: center;
  justify-content: start;
`
const LogoWrapper = styled.div`
  margin: 0 5px 0 5px;
`
const SmallText = styled.div`
  font-size: 12px;
`
const StyledLogoLink = styled.a`
  margin: 0 5px 0 5px;
  pointer-events: auto;
  cursor: pointer;
`

const AcceptCookieText = () => {
  return (
    <div>
      <P>
        <T>info_modal.first_welcome.content</T>
        <span role="img" aria-label='surfer'>&#127940;</span>
      </P>
      <P>
        <T>info_modal.cookie.info</T>
      </P>
    </div>
  )
}

const WelcomeInfo = (props: PropsFromRedux) => {
  if (!props.ui.info) return null

  return (
    <InfoContainer>
      <FlexDiv>
        <WhiteBox>
          <InfoWrapper>
            <ToggleLanguageButtons size={16} />
            <Title><T>info_modal.welcome.title</T> (demo)!</Title>
            {!props.visitedBefore && <AcceptCookieText />}
            <P>
              <T>info_modal.dev_status_info</T>
            </P>
            <SubHeading><T>info_modal.why.title</T></SubHeading>
            <P>
              <T>info_modal.why.content</T>
            </P>
            <SubHeading><T>info_modal.how.title</T></SubHeading>
            <P>
              <T>info_modal.how.content</T>
            </P>
            <SubHeading><T>info_modal.what.title</T></SubHeading>
            <P>
              <T>info_modal.what.content.enfuser.description</T> <Link href='https://en.ilmatieteenlaitos.fi/environmental-information-fusion-service' target='_blank' rel='noopener noreferrer'>
                <T>info_modal.what.content.enfuser.link_label</T></Link>.
            </P>
            <P>
              <Link href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017' target='_blank' rel='noopener noreferrer'>
                <T>info_modal.what.content.noise_data.link_label</T></Link>{' '} <T>info_modal.what.content.noise_data.description</T>
            </P>
            <P>
              <T>info_modal.what.content.osm.description</T> <Link href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>
                OpenStreetMap</Link> <T>info_modal.what.content.osm.suffix</T>(CC-BY-SA).
            </P>
            <SubHeading><T>info_modal.who.title</T></SubHeading>
            <P>
              <T>info_modal.who.content.developed_by</T> <Link href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                Digital Geography Lab</Link><T>info_modal.who.content.developed_by.suffix</T> <T>info_modal.who.content.within_the</T> <Link href='https://ilmanlaatu.eu/briefly-in-english/' target='_blank' rel='noopener noreferrer'>
                Urban Innovative Action: HOPE</Link>{' '} – <T>info_modal.who.content.hope_description</T>
            </P>
            <SubHeading> <T>info_modal.code.title</T> </SubHeading>
            <P>
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-ui' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-ui</Link>{' '}
              <br />
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-server' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-server</Link>{' '}
            </P>
            <P>
              <LogoFlex>
                <LogoWrapper><img src={ERDF} width="65" height='60' alt='EULogo' /></LogoWrapper>
                <StyledLogoLink href='https://ilmanlaatu.eu/' target='_blank' rel='noopener noreferrer'>
                  <img src={HopeLogo} width="116" height="30" alt='HopeLogo' />
                </StyledLogoLink>
                <StyledLogoLink href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                  <img src={HYLogo} width='54' height='58' alt='HYLogo' />
                </StyledLogoLink>
              </LogoFlex>
              <SmallText>
                <T>info_modal.funded_by</T>
              </SmallText>
            </P>
          </InfoWrapper>
          <ButtonDiv id='hide-welcome-button'>
            <Button small green onClick={props.hideInfo}>OK</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </InfoContainer>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  ui: state.ui,
  visitedBefore: state.visitor.visitedBefore,
})

const connector = connect(mapStateToProps, { showInfo, hideInfo })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(WelcomeInfo)