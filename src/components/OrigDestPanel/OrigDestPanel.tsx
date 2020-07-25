import React from 'react'
import styled, { css } from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import UseCurrLocButton from './UseCurrLocButton'
import RoutingSettingsRow from './RoutingSettingsRow'
import { useUserLocationOrigin, resetOrig, resetDest } from '../../reducers/origDestReducer'
import LoadAnimation from './../LoadAnimation/LoadAnimation'
import ShowInfoButton from './ShowInfoButton'

const Container = styled.div`
  background-color: rgba(255,255,255,0.98);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const LowerTransparentPanel = styled.div`
  display: flex;
  justify-content: flex-end;
`
const OdContainer = styled.div<{ hide?: boolean }>`
  display: flex;
  align-items: center;
  ${props => props.hide === true && css`
    display: none;
  `}
`
const Wrapper = styled.div`
  width: 100%;
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
  padding: 3px 6px;
  margin: 0 5px 0 5px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 11px;
    font-weight: 450;
  }
  @media (min-width: 980px) {
    width: 345px;
    border: none;
  }
`

const roundCoords = (coord: number) => {
  return Math.round(coord * 10000) / 10000
}

const FormattedCoords = ({ feat }: { feat: PointFeature }) => {
  const x = feat.geometry.coordinates[0]
  const y = feat.geometry.coordinates[1]
  return (
    <div>
      {String(roundCoords(y)) + ' ' + String(roundCoords(x))}
    </div>
  )
}

const OrigDestPanel = (props: PropsFromRedux) => {
  const { origDestFC, userLocation, useUserLocOrigin, waitUserLocOrigin, showingPaths, waitingPaths } = props
  const { resetOrig, resetDest } = props

  const origFeats = origDestFC.features.filter((feat: PointFeature) => feat.properties.type === 'orig')
  const destFeats = origDestFC.features.filter((feat: PointFeature) => feat.properties.type === 'dest')
  const orig = origFeats.length > 0 ? origFeats[0] : null
  const dest = destFeats.length > 0 ? destFeats[0] : null
  const showDisclaimer = !orig && !dest

  return (
    <div>
      <Container>
        <OdContainer hide={waitingPaths || showingPaths}>
          <Wrapper>
            {showDisclaimer && <StyledDisclaimer>
              The app and its real-time air quality data source are still under active development and hence not guaranteed to work at all times.
          </StyledDisclaimer>}
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
                  <LocationInfo>
                    {waitUserLocOrigin
                      ? <LoadAnimation size={18} />
                      : 'unset'}
                  </LocationInfo>
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
                  : 'unset'}
                {dest && !(showingPaths || waitingPaths)
                  ? <ResetLocButton onClick={resetDest}><Close /></ResetLocButton>
                  : null}
              </LocationInfo>
            </FlexRow>
          </Wrapper>
        </OdContainer>
        <RoutingSettingsRow />
      </Container>
      <LowerTransparentPanel>
        <ShowInfoButton />
      </LowerTransparentPanel>
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  userLocation: state.userLocation,
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
  origDestFC: state.origDest.origDestFC,
  useUserLocOrigin: state.origDest.useUserLocOrigin,
  waitUserLocOrigin: state.origDest.waitUserLocOrigin,
})

const mapDispatchToProps = {
  useUserLocationOrigin,
  resetOrig,
  resetDest,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(OrigDestPanel)
