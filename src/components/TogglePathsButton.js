import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { getSetQuietPaths, getSetCleanPaths, setQuietPaths, setCleanPaths } from '../reducers/pathsReducer'
import { pathTypes } from '../constants'

const Button = styled.div`
  cursor: pointer;
  padding: 4px 9px;
  color: black;
  border-radius: 5px;
  border: 2px solid black;
  margin: 0px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  width: max-content;
  letter-spacing: 1px;
  max-width: 90%;
  overflow: auto;
  height: auto;
  pointer-events: auto;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  background-color: white;
  @media (min-width: 600px) {
    &:hover { 
      background-color: black;
      color: white;
    }
  }
  ${props => props.disabled === true && css`
    cursor: default;
    pointer-events: none;
    border-color: grey;
    color: grey;
  `}
`

const odsMatch = (quietPathOd, cleanPathOd) => {
  if (!quietPathOd || !cleanPathOd) {
    return false
  }
  if (JSON.stringify(quietPathOd[0]) !== JSON.stringify(cleanPathOd[0])
    || JSON.stringify(quietPathOd[1]) !== JSON.stringify(cleanPathOd[1])) {
    return false
  }
  return true
}

const getTogglePathsButtonText = ({ showingPathsType, quietPathData, cleanPathData }) => {
  if (!showingPathsType) return ''
  if (showingPathsType === pathTypes.clean) {
    return odsMatch(quietPathData.od, cleanPathData.od) ? 'Show quiet paths' : 'Find quiet paths'
  } else if (showingPathsType === pathTypes.quiet) {
    return odsMatch(quietPathData.od, cleanPathData.od) ? 'Show clean paths' : 'Find clean paths'
  }
}

const getPathToggleFunc = (props) => {
  const { showingPathsType, quietPathData, cleanPathData, routingId } = props
  const { getSetQuietPaths, getSetCleanPaths, setQuietPaths, setCleanPaths } = props

  if (odsMatch(quietPathData.od, cleanPathData.od) === true) {
    console.log('toggle paths')
    return showingPathsType === pathTypes.quiet
      ? setCleanPaths(quietPathData.od[0], quietPathData.od[1], routingId, cleanPathData.data)
      : setQuietPaths(cleanPathData.od[0], cleanPathData.od[1], routingId, quietPathData.data)
  } else {
    return showingPathsType === pathTypes.quiet
      ? getSetCleanPaths(quietPathData.od[0], quietPathData.od[1], routingId)
      : getSetQuietPaths(cleanPathData.od[0], cleanPathData.od[1], routingId)
  }
}

const TogglePathsButton = (props) => {

  return (
    <Button disabled={!props.cleanPathsAvailable && props.showingPathsType === pathTypes.quiet}
      onClick={() => getPathToggleFunc(props)}>
      {getTogglePathsButtonText(props)}
    </Button>
  )
}

const mapStateToProps = (state) => ({
  cleanPathsAvailable: state.paths.cleanPathsAvailable,
  routingId: state.paths.routingId,
  showingPathsType: state.paths.showingPathsType,
  quietPathData: state.paths.quietPathData,
  cleanPathData: state.paths.cleanPathData,
})

const mapDispatchToProps = {
  getSetQuietPaths,
  getSetCleanPaths,
  setQuietPaths,
  setCleanPaths,
}

const ConnectedTogglePathsButton = connect(mapStateToProps, mapDispatchToProps)(TogglePathsButton)
export default ConnectedTogglePathsButton
