import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import UseCurrLocButton from './UseCurrLocButton'
import { useUserLocationOrigin, resetOrig, resetDest } from '../../reducers/origDestReducer'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255,255,255,0.98);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15), 0 6px 20px 0 rgba(0,0,0,0.09);
  ${props => props.hide === true && css`
    display: none;
  `}
`
const Wrapper = styled.div`
  width: 100%
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 5px;
`
const FlexRow = styled.div`
  pointer-events: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 6px 6px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
`
const LocationType = styled.div`
  font-weight: 450;
  padding: 3px 5px;
  padding: 2px 4px;
`
const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  padding: 5px 7px;
  margin-left: 5px;
  color: #4a4a4a;
  border: 1px solid #4a4a4a;
  border-radius: 7px;
`
const Close = styled(IoIosClose)`
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  font-size: 36px;
`
const ResetLocButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
  display: table;
  color: black;
  border-radius: 7px;
  margin: -10px -9px -10px -1px;
`
const StyledDisclaimer = styled.div`
  color: black;
  padding: 2px 6px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  @media (min-width: 550px) {
    font-size: 12px;
  }
`

const roundCoords = (coord) => {
  return Math.round(coord * 10000) / 10000
}

const FormattedCoords = ({ feat }) => {
  const x = feat.geometry.coordinates[0]
  const y = feat.geometry.coordinates[1]
  return (
    <div>
      {String(roundCoords(y)) + ' ' + String(roundCoords(x))}
    </div>
  )
}

const OrigDestPanel = (props) => {
  const { origDestFC, userLocation, useUserLocOrigin, showingPaths, waitingPaths } = props
  const { resetOrig, resetDest } = props

  const origFeats = origDestFC.features.filter(feat => feat.properties.type === 'orig')
  const destFeats = origDestFC.features.filter(feat => feat.properties.type === 'dest')
  const orig = origFeats.length > 0 ? origFeats[0] : null
  const dest = destFeats.length > 0 ? destFeats[0] : null
  const showDisclaimer = !orig && !dest

  return (
    <Container hide={waitingPaths || showingPaths}>
      <Wrapper>
        <FlexRow>
          <LocationType>From:</LocationType>
          {orig
            ? <LocationInfo>
              <FormattedCoords feat={orig} />
              {orig && !(showingPaths || waitingPaths)
                ? <ResetLocButton onClick={resetOrig}><Close /></ResetLocButton>
                : null}
            </LocationInfo>
            : <Flex>
              <LocationInfo>undefined</LocationInfo>
              {useUserLocOrigin
                ? null
                : <UseCurrLocButton handleClick={() => props.useUserLocationOrigin(userLocation)} />}
            </Flex>}
        </FlexRow>
        <FlexRow>
          <LocationType>To:</LocationType>
          <LocationInfo>
            {dest
              ? <FormattedCoords feat={dest} />
              : 'undefined'}
            {dest && !(showingPaths || waitingPaths)
              ? <ResetLocButton onClick={resetDest}><Close /></ResetLocButton>
              : null}
          </LocationInfo>
        </FlexRow>
        {showDisclaimer && <StyledDisclaimer>
          The app and its real-time AQ data source are still under active development and hence not guaranteed to work at all times.
          </StyledDisclaimer>}
      </Wrapper>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
  origDestFC: state.origDest.origDestFC,
  useUserLocOrigin: state.origDest.useUserLocOrigin,
})

const mapDispatchToProps = {
  useUserLocationOrigin,
  resetOrig,
  resetDest,
}

const ConnectedOrigDestPanel = connect(mapStateToProps, mapDispatchToProps)(OrigDestPanel)

export default ConnectedOrigDestPanel
