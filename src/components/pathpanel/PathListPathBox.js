import React from 'react'
import styled, { css } from 'styled-components'
import { utils } from '../../utils/index'
import { PathNoisesBar } from './PathNoisesBar'

const StyledPathListPathBox = styled.div.attrs(props => ({
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
  width: calc(88% - 21px);
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
  font-size: 12px;
  width: 100%;
`
const PathIdTag = styled.div`
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 9px;
  text-align: center;
  line-height: 14px;
  width: 14px;
  height: 14px;
  min-width: min-content;
  margin-right: -8px;
  ${props => props.quiet && css`
    line-height: 15px;
    width: 15px;
    height: 15px;
    color: white;
    background-color: #007700;
    border: none;`}
`

const PathListPathBox = ({ path, index, selected, pathType, handleClick }) => {
  if (pathType === 'short') {
    return <ShortestPathBox path={path} selected={selected} handleClick={handleClick} />
  } else {
    return <QuietPathBox path={path} index={index} selected={selected} handleClick={handleClick} />
  }
}

const ShortestPathBox = ({ path, selected, handleClick }) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <PathIdTag>S</PathIdTag>
        <div>
          {utils.getFormattedDistanceString(path.properties.length, false).string}
        </div>
        <div>
          {path.properties.nei_norm} <sub>ni</sub> ({utils.getNoiseIndexLabel(path.properties.nei_norm)})
        </div>
        <div>
          {Math.round(path.properties.mdB)} dB<sub>mean</sub>
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const QuietPathBox = ({ path, index, selected, handleClick }) => {
  const mdB_diff = path.properties.mdB_diff
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <PathIdTag quiet>{index + 1}</PathIdTag>
        <div>
          {utils.getFormattedDistanceString(path.properties.len_diff, true).string}
        </div>
        <div>
          {Math.round(path.properties.nei_diff_rat) + ' % noise'}
        </div>
        <div>
          {Math.abs(mdB_diff) < 1 ? mdB_diff : Math.round(mdB_diff)} dB<sub>mean</sub>
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

export default PathListPathBox
