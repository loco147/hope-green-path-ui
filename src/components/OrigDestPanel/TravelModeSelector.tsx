import React from 'react'
import styled, { css } from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { MdDirectionsBike } from 'react-icons/md'
import { MdDirectionsWalk } from 'react-icons/md'
import { setTravelMode } from './../../reducers/pathsReducer'
import { TravelMode } from '../../services/paths'

const StyledBikeI = styled(MdDirectionsBike)`
  font-size: 23px;
  margin-top: 3px;
  margin-bottom: -2px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const StyledWalkI = styled(MdDirectionsWalk)`
  font-size: 23px;
  margin-top: 2px;
  margin-bottom: -1px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
`
const ButtonRow = styled.div`
  display: flex;
  align-content: center;
  margin: 2px 4px;
`
const StyledIconContainer = styled.div<{ bike?: any, selected: boolean }>`
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  margin: 2px 4px;
  padding: 2px 10px;
  border-radius: 25px;
  height: 28px;
  width: 32px;
  align-content: center;
  justify-content: center;
  background: #f5f5f5c4;
  border: 1px solid #f5f5f5c4;
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s; /* Safari */
  @media (min-width: 550px) {
    &:hover { 
      border-color: black;
    }
  }
  ${props => props.selected === true && css`
    background: #eaf8ff;
    border-color: #65a1bd;
    pointer-events: none;
    &:hover { 
      border-color: #65a1bd;
    }
  `}
`

const TravelModeSelector = (props: PropsFromRedux) => {
  const { travelMode, setTravelMode } = props

  return (
    <ButtonRow>
      <StyledIconContainer
        onClick={() => setTravelMode(TravelMode.WALK)}
        selected={travelMode === TravelMode.WALK}>
        <StyledWalkI />
      </StyledIconContainer>
      <StyledIconContainer
        onClick={() => setTravelMode(TravelMode.BIKE)}
        selected={travelMode === TravelMode.BIKE}
        bike>
        <StyledBikeI />
      </StyledIconContainer>
    </ButtonRow>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
  travelMode: state.paths.travelMode,
})

const connector = connect(mapStateToProps, { setTravelMode })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(TravelModeSelector)
