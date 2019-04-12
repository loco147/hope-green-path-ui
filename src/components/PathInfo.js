import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 10px 10px;
  align-items: center;
`

const StyledPathStats = styled.div`
  border-radius: 6px;
  background-color: #000000ad;
  padding: 6px 11px;
  color: white;
  font-size: 24px;
`

const PathStats = ({ pathFC }) => {
  const shortestPath = pathFC.features[0]
  return (
    <StyledPathStats>
      Shortest path: {Math.round(shortestPath.properties.length)} m
    </StyledPathStats>
  )
}

class PathInfo extends Component {
  render() {
    const { pathFC } = this.props.paths
    if (pathFC.features.length === 0) return null

    return (
      <OuterFlex>
        <PathStats pathFC={pathFC} />
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
})

const ConnectedPathInfo = connect(mapStateToProps, null)(PathInfo)
export default ConnectedPathInfo
