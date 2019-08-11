import React from 'react'
import styled from 'styled-components'
import { utils } from '../../utils/index'
import { ArrowForwardButton } from './../Icons'
import { PathNoisesBar } from './PathNoisesBar'

const StyledPathInfoBox = styled.div.attrs(props => ({
  style:
    ({
      border: props.selected ? '2px solid #ed7b00' : '',
      boxShadow: props.selected ? '0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.25)' : ''
    })
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;
  height: 48px;
  border-radius: 5px;
  margin: 4px 0px 4px 0px
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  width: calc(90% - 21px);
  &:hover { 
    cursor: pointer;
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
`
const PathPropsRow = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  width: 100%;
`

export const PathInfoBox = ({ path, selected, pathType }) => {
  return (
    <StyledPathInfoBox pathType={pathType} selected={selected}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts}/>
      <PathPropsRow>
        <div>
          {pathType === 'short'
            ? utils.getFormattedDistanceString(path.properties.length, false)
            : utils.getFormattedDistanceString(path.properties.len_diff, true)}
        </div>
        <div>
        {pathType === 'short'
          ? path.properties.nei_norm +' noise index'
          : Math.round(path.properties.nei_diff_rat) +' % noise'}
        </div>
        <div>
          {pathType === 'short'
            ? Math.round(path.properties.mdB)
            : Math.round(path.properties.mdB_diff)} dB<sub>mean</sub>
        </div>
      </PathPropsRow>
    </StyledPathInfoBox>
  )
}

const StyledOpenPathBox = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto;
  height: 48px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  margin: 4px 0px 4px 0px
  &:hover { 
    cursor: pointer;
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
  width: 21px;
`

export const OpenPathBox = ({ pathType }) => {
  return (
    <StyledOpenPathBox pathType={pathType}>
      <ArrowForwardButton />
    </StyledOpenPathBox>
  )
}
