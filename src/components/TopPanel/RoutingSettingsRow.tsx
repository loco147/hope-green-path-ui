import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'
import TravelModeSelector from './TravelModeSelector'
import ResetPathsButton from './ResetPathsButton'
import LocateButton from './LocateButton'
import ToggleLanguageButton from './ToggleLanguageButton'

const OuterContainer = styled.div`
  display: flex;
`

const ResetContainer = styled.div`
  display: flex;
  align-items: center;
`

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 15px;
  padding: 4px 5px;
  width: 80%;
`
const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 15px;
  padding: 4px 11px 4px 10px;
  width: 20%;
`

const RoutingSettingsRow = (props: PropsFromRedux) => {
  const { showingPaths, waitingPaths } = props
  return (
    <OuterContainer>
      <ResetContainer>
        {showingPaths || waitingPaths ? <ResetPathsButton /> : null}
      </ResetContainer>
      <SettingsContainer>
        <TravelModeSelector />
        <LocateButton />
      </SettingsContainer>
      <LanguageContainer>
        <ToggleLanguageButton />
      </LanguageContainer>
    </OuterContainer>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  showingPaths: state.paths.showingPaths,
  waitingPaths: state.paths.waitingPaths,
})

const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(RoutingSettingsRow)
