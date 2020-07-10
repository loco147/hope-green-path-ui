import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { menu, pathTypes } from './../../constants'
import TogglePathsButton from './TogglePathsButton'
import { togglePathPanel, showPathList, showMaxLengthFilterSelector } from './../../reducers/menuReducer'
import { ListButton, ArrowUpButton, ArrowDownButton } from './../Icons'
import FilterButton from './FilterButton'

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
const Margin = styled.div`
  margin-left: ${props => props.left ? props.left : '0'}px;
`

const BottomControlPanel = (props) => {
  const { showingPaths, showingPathsType, pathPanelVisible, pathPanelContent, quietPathCount, cleanPathCount,
    lengthLimit, lengthLimits, togglePathPanel, showPathList, showMaxLengthFilterSelector } = props

  if (!showingPaths) return null

  const greenPathCount = showingPathsType === pathTypes.clean
    ? cleanPathCount
    : quietPathCount

  return (
    <ControlPanel pathPanelVisible={pathPanelVisible}>
      <ButtonFlex>
        <Margin>
          {pathPanelContent === menu.lengthLimitSelector
            ? <ListButton onClick={showPathList} />
            : <FilterButton
              greenPathCount={greenPathCount}
              lengthLimit={lengthLimit}
              lengthLimits={lengthLimits}
              onClick={showMaxLengthFilterSelector} />}
        </Margin>
        <Margin left={15}>
          {pathPanelVisible
            ? <ArrowDownButton onClick={togglePathPanel}></ArrowDownButton>
            : <ArrowUpButton onClick={togglePathPanel}></ArrowUpButton>}
        </Margin>
        <TogglePathsButton />
      </ButtonFlex>
    </ControlPanel>
  )
}

const mapStateToProps = (state) => ({
  showingPaths: state.paths.showingPaths,
  showingPathsType: state.paths.showingPathsType,
  pathPanelVisible: state.menu.pathPanel,
  pathPanelContent: state.menu.pathPanelContent,
  quietPathCount: state.paths.quietPathFC.features.length,
  cleanPathCount: state.paths.cleanPathFC.features.length,
  lengthLimit: state.paths.lengthLimit,
  lengthLimits: state.paths.lengthLimits,
})

const ConnectedBottomControlPanel = connect(mapStateToProps, { togglePathPanel, showPathList, showMaxLengthFilterSelector })(BottomControlPanel)
export default ConnectedBottomControlPanel
