import React from 'react'
import styled, { css } from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { getSetQuietPaths, getSetCleanPaths, setQuietPaths, setCleanPaths } from '../../reducers/pathsReducer'
import { RoutingMode } from '../../constants'

const Button = styled.div<{ disabled: boolean }>`
  cursor: pointer;
  padding: 5px 11px;
  color: white;
  border-radius: 30px;
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
  background-color: #2d2d2d;
  @media (min-width: 600px) {
    &:hover {
      margin-bottom: 3px;
    }
  }
  ${props => props.disabled === true && css`
    cursor: default;
    pointer-events: none;
    background-color: #d2d2d2;
  `}
`

enum ToggleType {
  SHOW = 'Show',
  FIND = 'Find'
}

interface LabelProps {
  disabled: boolean
  toggleToPathType: RoutingMode
}

const StyledPathTypeLabel = styled.span<LabelProps>`
  color: green;
  ${props => props.toggleToPathType === RoutingMode.QUIET && css`
    color: #6ff7ff;
    &:before {
      content: 'quiet';
    }`}
  ${props => props.toggleToPathType === RoutingMode.CLEAN && css`
    color: #74ff74;
    &:before {
      content: 'fresh air';
    }`}
  ${props => props.disabled === true && css`
    color: white;
  `}
`

const odsMatch = (quietPathOd: OdCoords | null, cleanPathOd: OdCoords | null) => {
  if (!quietPathOd || !cleanPathOd) {
    return false
  }
  if (JSON.stringify(quietPathOd[0]) !== JSON.stringify(cleanPathOd[0])
    || JSON.stringify(quietPathOd[1]) !== JSON.stringify(cleanPathOd[1])) {
    return false
  }
  return true
}

const getPathToggleFunc = (toggleType: ToggleType, props: PropsFromRedux) => {
  const { travelMode, showingPathsType, quietPathData, cleanPathData, routingId } = props
  const { getSetQuietPaths, getSetCleanPaths, setQuietPaths, setCleanPaths } = props

  if (toggleType === ToggleType.SHOW) {
    return showingPathsType === RoutingMode.QUIET
      ? setCleanPaths(quietPathData!.od![0], quietPathData!.od![1], routingId, cleanPathData!.data!, travelMode)
      : setQuietPaths(cleanPathData!.od![0], cleanPathData!.od![1], routingId, quietPathData!.data!, travelMode)
  } else {
    return showingPathsType === RoutingMode.QUIET
      ? getSetCleanPaths(quietPathData!.od![0], quietPathData!.od![1], travelMode, routingId)
      : getSetQuietPaths(cleanPathData!.od![0], cleanPathData!.od![1], travelMode, routingId)
  }
}

const getToggleType = (props: PropsFromRedux): ToggleType => {
  const { quietPathData, cleanPathData } = props
  if (quietPathData && cleanPathData && quietPathData.travelMode === cleanPathData.travelMode
    && odsMatch(quietPathData.od, cleanPathData.od)) {
    return ToggleType.SHOW
  } else return ToggleType.FIND
}

const TogglePathsButton = (props: PropsFromRedux) => {
  const { cleanPathsAvailable, showingPathsType } = props

  const toggleType = getToggleType(props)
  const toggleToPathType = showingPathsType === RoutingMode.CLEAN ? RoutingMode.QUIET : RoutingMode.CLEAN
  const disabled = !cleanPathsAvailable && showingPathsType === RoutingMode.QUIET
  return (
    <Button disabled={disabled}
      onClick={() => getPathToggleFunc(toggleType, props)}>
      {toggleType} <StyledPathTypeLabel disabled={disabled} toggleToPathType={toggleToPathType} /> paths
    </Button>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  cleanPathsAvailable: state.paths.cleanPathsAvailable,
  routingId: state.paths.routingId,
  travelMode: state.paths.travelMode,
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

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(TogglePathsButton)
