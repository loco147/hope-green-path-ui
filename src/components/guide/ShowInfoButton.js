import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { showInfo } from './../../reducers/menuReducer'

const StyledShowInfoButton = styled.div`
  position: absolute;
  top: 67px;
  right: 9px;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  padding: 1px 11px;
  font-weight: 640;
  border-radius: 8px;
  font-size: 22px;
  border: 2px solid black;
  background-color: white;
  color: black;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:before {
    content: 'i';
  }
  @media (min-width: 600px) {
    &:hover { 
      background-color: black;
      color: white;
    }
  }
`

const ShowInfoButton = ({ menu, absolute, showInfo }) => {
  return !menu.info
  ? <StyledShowInfoButton absolute={absolute} onClick={showInfo} />
  : null
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedShowInfoButton = connect(mapStateToProps, { showInfo })(ShowInfoButton)
export default ConnectedShowInfoButton
