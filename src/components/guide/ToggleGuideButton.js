import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '../Button'
import { toggleGuide } from './../../reducers/menuReducer'

const StyledToggleGuideButton = styled(Button)`
  position: absolute;
  pointer-events: none;
  z-index: 8;
  top: 105px;
  right: 6px;
  padding: 2px 10px;
  font-weight: 450;
  border: 2px solid black;
  background-color: white;
  color: black;
  margin-right: 0px;
  cursor: pointer;
  pointer-events: auto;
  transition-duration: 0s;
  -webkit-transition-duration: 0s; /* Safari */
  &:before {
    content: 'i';
  }
  &:hover {
    margin-right: 2px;
    background-color: white;
  }
`

export const ToggleGuideButton = (props) => {
  return (
    <StyledToggleGuideButton onClick={props.toggleGuide} guide={props.menu.guide} />
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedToggleGuideButton = connect(mapStateToProps, { toggleGuide })(ToggleGuideButton)
export default ConnectedToggleGuideButton
