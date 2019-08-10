import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { togglePathStats } from './../reducers/menuReducer'
import ToggleGuideButton from './guide/ToggleGuideButton'
import { FilterButton, ArrowUpButton, ArrowDownButton } from './Icons'

const ControlPanel = styled.div`
  background: rgba(255,255,255,0.95);
  height: 53px;
  width: calc(100% - 2px);
  margin-left: 0px;
  display: flex;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  border: 1px solid #d0d0d0;
  @media (min-width: 444px) {
    border-top-right-radius: 15px;
  }
`
const ButtonFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  @media (min-width: 600px) {
    justify-content: flex-start;
    margin-left: 145px;
  }
`
const BottomControlPanel = ({ togglePathStats, pathStatsVisible }) => {

  return (
    <ControlPanel >
      <ButtonFlex>
        <FilterButton />
        {pathStatsVisible
          ? <ArrowDownButton onClick={togglePathStats}></ArrowDownButton>
          : <ArrowUpButton onClick={togglePathStats}></ArrowUpButton>}
        <ToggleGuideButton />
      </ButtonFlex>
    </ControlPanel >
  )
}

const mapStateToProps = (state) => ({
  pathStatsVisible: state.menu.pathStats,
})

const ConnectedBottomControlPanel = connect(mapStateToProps, { togglePathStats })(BottomControlPanel)
export default ConnectedBottomControlPanel
