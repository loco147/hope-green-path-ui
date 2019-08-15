import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { menu } from './../constants'
import { togglePathPanel, showPathList, showMaxDetourFilterSelector } from './../reducers/menuReducer'
import ToggleGuideButton from './guide/ToggleGuideButton'
import { FilterButton, ListButton, ArrowUpButton, ArrowDownButton } from './Icons'

const ControlPanel = styled.div`
  background: rgba(255,255,255,0.98);
  height: 53px;
  margin-left: 0px;
  display: flex;
  pointer-events: auto;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  border: 1px solid #d0d0d0;
  border-top-right-radius: ${props => props.pathPanelVisible === true ? '0px' : '6px'};
  @media (min-width: 600px) {
    width 340px;
    padding: 0px 6px 0px 6px;
    border: none;
  }
`
const ButtonFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`
const BottomControlPanel = (props) => {
  const { showingPaths, pathPanelVisible, pathPanelContent, togglePathPanel, showPathList, showMaxDetourFilterSelector } = props
  if (!showingPaths) { return null }

  return (
    <ControlPanel pathPanelVisible={pathPanelVisible}>
      <ButtonFlex>
        {pathPanelContent === menu.detourFilterSelector
          ? <ListButton onClick={showPathList} />
          : <FilterButton onClick={showMaxDetourFilterSelector} />}
        {pathPanelVisible
          ? <ArrowDownButton onClick={togglePathPanel}></ArrowDownButton>
          : <ArrowUpButton onClick={togglePathPanel}></ArrowUpButton>}
        <ToggleGuideButton />
      </ButtonFlex>
    </ControlPanel >
  )
}

const mapStateToProps = (state) => ({
  showingPaths: state.paths.showingPaths,
  pathPanelVisible: state.menu.pathPanel,
  pathPanelContent: state.menu.pathPanelContent,
})

const ConnectedBottomControlPanel = connect(mapStateToProps, { togglePathPanel, showPathList, showMaxDetourFilterSelector })(BottomControlPanel)
export default ConnectedBottomControlPanel
