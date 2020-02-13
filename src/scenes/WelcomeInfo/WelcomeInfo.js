import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { showInfo, hideInfo } from './../../reducers/menuReducer'

const InfoContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 8;
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
  padding: 7px 0 11px 0;
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
const Link = styled.a`
  color: black;
`

const AcceptCookieText = () => {
  return (
    <div>
      <P>
        You've found the green paths route planner app, great! <span role="img" aria-label='surfer'>&#127940;</span>
      </P>
      <P>
        This site uses a cookie to show this welcome message only on the first visit.
        By clicking OK below, you accept this use of cookies.
      </P>
    </div>
  )
}

const WelcomeInfo = (props) => {
  if (!props.menu.info) return null

  return (
    <InfoContainer>
      <FlexDiv>
        <WhiteBox>
          <InfoWrapper>
            <Title>Welcome to green paths!</Title>
            {!props.visitedBefore && <AcceptCookieText />}
            <SubHeading>Why?</SubHeading>
            <P>
              While fresh air, quietness and greenery bring health benefits, then air pollution and excess noise may cause physical and mental health problems such as respiratory infections, cardiovascular disease or stress.
              Fortunately, a more peaceful, less polluted and greener (= healthier) route may be just slightly longer than the shortest one.
            </P>
            <SubHeading>How?</SubHeading>
            <P>
              This tool guides you to take pleasant walks to your destinations in Helsinki.
              You may compare routes from the shortest to the least polluted or quietest and find your own optimal way.
              The more you value peaceful and pleasant urban environment, the longer routes you may be ready to take.
            </P>
            <SubHeading>What?</SubHeading>
            <P>
              Hourly air quality index (AQI) is derived from the <Link href='https://en.ilmatieteenlaitos.fi/environmental-information-fusion-service' target='_blank' rel='noopener noreferrer'>
                FMI-ENFUSER high-resolution modelling system</Link>.
            </P>
            <P>
              <Link href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017' target='_blank' rel='noopener noreferrer'>
                Traffic noise data</Link>{' '} is based on an assessment conducted by the city of Helsinki (CC BY 4.0). It is a modelled GIS data representing typical daytime traffic noise levels.
            </P>
            <P>
              Street network data is downloaded from <Link href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>
                OpenStreetMap</Link>{' '}(CC-BY-SA).
            </P>
            <SubHeading>Who?</SubHeading>
            <P>
              Green path routing tool is developed by the <Link href='https://www.helsinki.fi/en/researchgroups/digital-geography-lab' target='_blank' rel='noopener noreferrer'>
                Digital Geography Lab</Link>, University of Helsinki, within the <Link href='https://ilmanlaatu.eu/briefly-in-english/' target='_blank' rel='noopener noreferrer'>
                Urban Innovative Action: HOPE</Link>{' '} – Healthy Outdoor Premises for Everyone.
              </P>
            <SubHeading> Code </SubHeading>
            <P>
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-ui' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-ui</Link>{' '}
              <br />
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-server' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-server</Link>{' '}
            </P>
          </InfoWrapper>
          <ButtonDiv>
            <Button small green onClick={() => props.hideInfo(props.showingPaths)}>OK</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </InfoContainer>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  visitedBefore: state.visitor.visitedBefore,
  showingPaths: state.paths.showingPaths,
})

const ConnectedWelcomeInfo = connect(mapStateToProps, { showInfo, hideInfo })(WelcomeInfo)
export default ConnectedWelcomeInfo
