import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { showInfo } from './../../reducers/menuReducer'

const StyledShowInfoButton = styled.div`
  position: absolute;
  top: 67px;
  right: 15px;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  padding: 1px 10px;
  font-weight: 640;
  border-radius: 8px;
  font-size: 22px;
  border: 2px solid black;
  background-color: white;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15), 0 6px 20px 0 rgba(0,0,0,0.09);
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

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ShowInfoButton = ({ menu, absolute, showInfo }) => {
  return !menu.info
    ? <StyledShowInfoButton absolute={absolute} onClick={showInfo} />
    : null
}

const ConnectedShowInfoButton = connect(mapStateToProps, { showInfo })(ShowInfoButton)
export default ConnectedShowInfoButton
