import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '../Button'
import { toggleGuide } from './../../reducers/menuReducer'
import { IconDiv, Star } from './../Icons'

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
  font-size: 21px;
  padding: 7px 0 13px 0;
`
const Colored = styled.span`
  color: ${props => props.color ? props.color : ''};
`
const P = styled.div`
  padding: 7px 0;
  line-height: 1.5;
  font-weight: 350;
  font-size: 14px;
  letter-spacing: 0.5px;
`
const SubHeading = styled.div`
  font-weight: 500;
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 0 5px 0px;
`
const Key = styled.div`
  height: min-content;
  border-radius: 4px;
  background-color: #c59300;
  padding: 3px 5px;
  color: white;
  font-size: 14px;
  margin: 2px 3px 2px 3px;
  min-width: 18px;
  background-color: #000000db;
  display: flex;
  align-items: center;
  ${props => props.stars && css`
    min-width: min-content;
    color: black;
    background-color: white;
    margin: 13px 3px 4px 3px;
    border: 1px solid black;
`}
`
const ValueBox = styled(Key)`
  margin: 0px 3px 2px 3px;
  background-color: #efefef;
  color: black;
  padding: 4px 7px;
`
const KeyValueFlex = styled.div`
  display: flex;
  margin: 5px 0px;
  align-items: center;
  ${props => props.stars && css`
  align-items: flex-start;
`}
`

const KeyValuePair = ({ prop, value }) => {
  return (
    <KeyValueFlex>
      <Key>{prop}</Key>
      <ValueBox> {value}</ValueBox>
    </KeyValueFlex>
  )
}

const Guide = (props) => {
  if (!props.menu.guide) return null

  return (
    <GuideContainer>
      <FlexDiv>
        <WhiteBox>
          <Instructions>
            <Title>Quiet Paths <Colored color='#14b514'>beta</Colored></Title>
            <SubHeading>
              Path attributes:
            </SubHeading>
            <P>
              <KeyValuePair prop={'Et'} value={'Total cumulative exposure (index) to traffic noise along the path.'} />
              <KeyValuePair prop={'Ed'} value={"How much smaller (%) is the quiet path's exposure compared to the shortest path's exposure."} />
              <KeyValuePair prop={'En'} value={'Normalized traffic noise exposure index. Varies between 0 and 1 (higher is worse).'} />
              <KeyValuePair prop={'60'} value={'Exposure to 60dB traffic noise as cumulative walking distance (m) along the path.'} />
              <KeyValuePair prop={'XX'} value={'Exposure to XXdB traffic noise as cumulative walking distance (m) along the path.'} />
              <KeyValueFlex stars>
              <Key stars> 2.1 <IconDiv><Star /></IconDiv> </Key>
              <ValueBox>
                This index describes the goodness of the quiet path. The higher the better.
                It tells how much exposure to traffic noise is avoided per every extra meter walked.
                Values lower than 1.0 suggest that the path is not very useful in avoiding exposure to traffic noise compared to the shortest path.
              </ValueBox>
              </KeyValueFlex>
            </P>
            <P>
              <a
                href='https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017'
                target='_blank' rel='noopener noreferrer'>Traffic noise data</a>{' '} is based on assessment made by the city of Helsinki.
            It is modelled data that represents the typical daytime traffic noise levels. Thus, the quiet paths are most applicable at times when
            the traffic flows are near average.
            </P>
            <P>
              Code: <br></br>
              <a href='https://github.com/hellej/quiet-path-ui' target='_blank' rel='noopener noreferrer'>github.com/hellej/quiet-path-ui</a>{' '}
              <br></br>
              <a href='https://github.com/hellej/gradu-pocs' target='_blank' rel='noopener noreferrer'>github.com/hellej/gradu-pocs</a>{' '}
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
