import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '../Button'
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
const Instructions = styled.div`
  max-height: 68vh;
  overflow: auto;
`
const Title = styled.div`
  font-weight: 300;
  font-size: 21px;
  padding: 7px 0 13px 0;
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

const WelcomeInfo = (props) => {
  if (!props.menu.info) return null

  return (
    <InfoContainer>
      <FlexDiv>
        <WhiteBox>
          <Instructions>
            <Title>Welcome to quiet paths!</Title>
            <P>
              You've found the quiet paths route planner app, great! &#128526;
            </P>
            <P>
              Accept cookies by clicking OK below and this message won't be shown again in future visits.
            </P>
            <SubHeading> Why quiet paths? </SubHeading>
            <P>
              If they are just slightly longer, why not? Numerous studies have shown that exposure to traffic noise is likely to cause
              negative health effects such as increased stress levels and blood pressure.
              </P>
            <P>
              Moreover, traffic noise usually works as a
              pretty good proxy for other negative effects of traffic, including air pollution and unpleasant infrastructures.
            </P>
            <SubHeading> How? </SubHeading>
            <P>
              The app utilizes quiet path optimization method developed as part of a{' '}
              <Link href='https://github.com/hellej/quiet-paths-msc' target='_blank' rel='noopener noreferrer'>master's thesis</Link>. &#129299;
            </P>
            <P>
              <Link
                href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017'
                target='_blank' rel='noopener noreferrer'>Traffic noise data</Link>{' '} is based on an assessment conducted by the city of Helsinki (CC BY 4.0).
    It is modelled GIS data for typical daytime traffic noise levels. Thus, the quiet paths are most applicable at times when
    traffic flows are near average.
            </P>
            <P>
              Street network data is downloaded from <Link href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>OpenStreetMap</Link>{' '}
              (CC BY-SA).
            </P>
            <SubHeading> Code </SubHeading>
            <P>
              <Link href='https://github.com/hellej/quiet-path-ui' target='_blank' rel='noopener noreferrer'>github.com/hellej/quiet-path-ui</Link>{' '}
              <br></br>
              <Link href='https://github.com/hellej/quiet-paths-msc' target='_blank' rel='noopener noreferrer'>github.com/hellej/quiet-paths-msc</Link>{' '}
            </P>
          </Instructions>
          <ButtonDiv>
            <Button small green onClick={props.hideInfo}>OK</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </InfoContainer>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedWelcomeInfo = connect(mapStateToProps, { showInfo, hideInfo })(WelcomeInfo)
export default ConnectedWelcomeInfo
