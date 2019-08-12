import React from 'react'
import styled from 'styled-components'
import { PathNoisesBar } from './PathNoisesBar'
import { OpenedPathNoiseStats } from './OpenedPathNoiseStats'
import { ClosePathBox } from './OpenClosePathBoxes'
import { utils } from '../../utils/index'

const PathPanelContainer = styled.div`
  margin: 0px;
  background: rgba(255,255,255,0.95);
  overflow: auto;
  width: auto;
  max-height: 184px;
  pointer-events: auto;
  padding: 6px 6px 3px 6px;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  @media (min-width: 600px) {
    width 340px;
    max-height: calc(100vh - 121px);
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
`
const PathRowFlex = styled.div`
  display: flex;
  justify-content: space-around;
`
const NoiseBarsFlex = styled.div`
  display: flex;
  width: calc(90% - 21px);
  min-height: 56px;
  flex-direction: column;
  justify-content: space-around;
  margin: 3px 0px 0px 0px;
`
const BarsLabel = styled.div`
  font-size: 14px;
  margin: 0px 0px 3px 0px;
`
const PathPropsRow = styled.div`
  display: flex;
  margin: 6px 0px 6px 0px;
  justify-content: space-around;
  font-size: 12px;
  width: 99%;
`

export const OpenedPathInfo = ({ path, sPath, unsetOpenedPath }) => {
  if (path.properties.type === 'short') {
    return <OpenedShortPathInfo path={path} sPath={sPath} unsetOpenedPath={unsetOpenedPath} />
  } else {
    return <OpenedQuietPathInfo path={path} sPath={sPath} unsetOpenedPath={unsetOpenedPath} />
  }
}

export const OpenedQuietPathInfo = ({ path, sPath, unsetOpenedPath }) => {
  return (
    <PathPanelContainer>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposures to different traffic noise levels on the shortest and the selected quiet path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={sPath.properties.noise_pcts} />
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex >
      <PathPropsRow>
        <div>
          {utils.getFormattedDistanceString(path.properties.length, false).string}
          {' (+ '}{utils.getFormattedDistanceString(path.properties.len_diff, false).string}
          {' / '}{Math.round(path.properties.len_diff_rat)} %)
          </div>
        <div>
          {Math.round(path.properties.nei_diff_rat) + ' % noise'}
        </div>
        <div>
          {Math.round(path.properties.mdB_diff)} dB<sub>mean</sub>
          {' '}({Math.round(path.properties.mdB)}dB)
        </div>
      </PathPropsRow>
      <OpenedPathNoiseStats path={path} sPath={sPath} pathType='quiet' />
    </PathPanelContainer>
  )
}

export const OpenedShortPathInfo = ({ path, sPath, unsetOpenedPath }) => {
  return (
    <PathPanelContainer>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposures to different traffic noise levels on the selected (shortest) path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex >
      <PathPropsRow>
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
      <OpenedPathNoiseStats path={path} sPath={sPath} pathType='short' />
    </PathPanelContainer>
  )
}
