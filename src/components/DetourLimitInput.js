
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setDetourLimit } from './../reducers/pathsReducer'

const SelectFlex = styled.div`
  align-items: center;
  border-radius: 7px; 
  display: flex;
  padding: 5px 0px 5px 10px;
  // width: 355px;
  justify-content: center;
  @media (max-width: 360px) {
    padding: 5px 0px 5px 0px;
    justify-content: left;
  }
  @media (min-width:591px) {
    padding-left: 0px;
    margin-left: -40px;
  }
`
const StyledText = styled.span`
  font-size: 20px;
  font-weight: 300;
  color: black;
  border-radius: 8px;
  padding: 5px 13px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`
const SelectWrapper = styled.div`
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  background: balack;
  background-clip: border-box;
  color: white;
  display: flex;
  flex-direction: row;
  flex: 0 1 14.5em;
  flex: none!important;
  text-align: center;
  cursor: pointer;
  pointer-events: auto;
`
const StyledSelect = styled.select`
  align-items: center;
  background-repeat: no-repeat;
  background-color: #17af40e8!important;
  font-size: 18px;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: inline-block;
  height: 35px;
  margin: 0px 10px 0px 0px;
  text-align: center;
  width: max-content;
  padding: 2px 12px;
  vertical-align: middle;
  -webkit-appearance: none!important;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:focus { 
    outline: inherit !important;
    color: inherit !important;
  }
  &:hover { 
    background-color: #128a32e8 !important;
  }
  @media (max-width: 600px) {
    font-size: 17px;
  }
`
const StyledOption = styled.option`
  text-align: center;
  display: block;
  padding-left: 10px;
  box-sizing: border-box;
`

class DetourLimitInput extends Component {
  render() {

    return (
      <SelectFlex>
        <StyledText> Set max detour: </StyledText>
        <SelectWrapper>
          <StyledSelect onChange={(e) => this.props.setDetourLimit(e.target.value)} defaultValue={1000}>
            <StyledOption value={50}>50 m</StyledOption>
            <StyledOption value={100}>100 m</StyledOption>
            <StyledOption value={200}>200 m</StyledOption>
            <StyledOption value={400}>400 m</StyledOption>
            <StyledOption value={600}>600 m</StyledOption>
            <StyledOption value={1000}>1 km </StyledOption>
            <StyledOption value={2000}>2 km </StyledOption>
            <StyledOption value={3000}> 3 km</StyledOption>
            <StyledOption value={4000}> 4 km</StyledOption>
            <StyledOption value={5000}> 5 km</StyledOption>
            <StyledOption value={7000}> 7 km</StyledOption>
            <StyledOption value={10000}> 10 km</StyledOption>
            <StyledOption value={15000}> 15 km</StyledOption>
          </StyledSelect>
        </SelectWrapper>
      </SelectFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  originTargetFC: state.originTarget.originTargetFC,
})

const ConnectedDetourLimitInput = connect(mapStateToProps, { setDetourLimit })(DetourLimitInput)

export default ConnectedDetourLimitInput
