import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '../Button'
import { toggleGuide } from './../../reducers/menuReducer'
import DbColorLegend from './DbColorLegend'

const GuideContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 7;
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
  font-size: 22px;
  padding: 7px 0 13px 0;
`
const Colored = styled.span`
  color: ${props => props.color ? props.color : ''};
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

const Guide = (props) => {
  if (!props.menu.guide) return null

  return (
    <GuideContainer>
      <FlexDiv>
        <WhiteBox>
          <Instructions>
            <Title>green paths <Colored color='#14b514'>beta</Colored></Title>
            <SubHeading> Noise bar chart</SubHeading>
            <DbColorLegend />
            <P>
              Bar charts visualize the cumulative exposures (%) to selected noise level ranges.
            </P>
            <SubHeading> Noise cost </SubHeading>
            <P>
              Additional noise cost is assigned to edges of the network when optimizing green (clean or quiet) paths.
              Noise cost is calculated from contaminated distances to different noise levels using higher cost coefficients for higher noise levels.
              The cumulative noise cost of a path is calculated in a similar way.
            </P>
            <SubHeading> Noise index (ni) </SubHeading>
            <P>
              Distance-normalized traffic noise index is shown for the shortest path. The index varies between 0 and 1. Higher value indicates exposure to higher noise levels along the path.
            </P>
            <SubHeading> Difference in noise (%) </SubHeading>
            <P>
              The difference in noise between green and shortest path is calculated as the difference in cumulative noise cost between the two paths.
            </P>
            <SubHeading> Sources </SubHeading>
            <P>
              <Link
                href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017'
                target='_blank' rel='noopener noreferrer'>Traffic noise data</Link>{' '} is based on an assessment conducted by the city of Helsinki (CC BY 4.0).
              It is a modelled GIS data for typical daytime traffic noise levels. Thus, the quiet paths are most applicable at times when
              traffic flows are near average.
            </P>
            <P>
              Street network data is downloaded from <Link href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>OpenStreetMap</Link>{' '}
              (CC BY-SA).
            </P>
            <SubHeading> Code </SubHeading>
            <P>
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-ui' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-ui</Link>{' '}
              <br></br>
              <Link href='https://github.com/DigitalGeographyLab/hope-green-path-server' target='_blank' rel='noopener noreferrer'>DigitalGeographyLab/hope-green-path-server</Link>{' '}
            </P>
          </Instructions>
          <ButtonDiv>
            <Button small green onClick={props.toggleGuide}>OK</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </GuideContainer>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedGuide = connect(mapStateToProps, { toggleGuide })(Guide)
export default ConnectedGuide
