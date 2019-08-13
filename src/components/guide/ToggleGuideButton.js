import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { toggleGuide } from './../../reducers/menuReducer'

const StyledToggleGuideButton = styled.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 1px 10px;
  font-weight: 640;
  border-radius: 8px;
  font-size: 22px;
  border: 3px solid black;
  background-color: white;
  color: black;
  transition-duration: 0s;
  -webkit-transition-duration: 0s; /* Safari */
  &:before {
    content: '?';
  }
  &:hover {
    background-color: white;
  }
`

export const ToggleGuideButton = (props) => (<StyledToggleGuideButton onClick={props.toggleGuide} guide={props.menu.guide} />)

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedToggleGuideButton = connect(mapStateToProps, { toggleGuide })(ToggleGuideButton)
export default ConnectedToggleGuideButton
