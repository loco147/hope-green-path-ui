import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from './Button'
import { getShortestPath } from './../reducers/pathsReducer'

const OuterFlex = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px 0 10px;
    align-items: center;
`

class Menu extends Component {
  render() {
    return (
      <OuterFlex>
        <Button onClick={() => this.props.getShortestPath()}> Get route</Button>
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
})

const ConnectedMenu = connect(mapStateToProps, { getShortestPath })(Menu)

export default ConnectedMenu
