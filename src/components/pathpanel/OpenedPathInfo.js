import React from 'react'
import styled from 'styled-components'
import { PathNoisesBar } from './PathNoisesBar'
import { OpenedPathNoiseStats } from './OpenedPathNoiseStats'
import { ClosePathBox } from './OpenClosePathBoxes'
import { utils } from '../../utils/index'

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
  margin: 3px 0px 1px 0px;
`
const BarsLabel = styled.div`
  font-size: 14px;
  margin: 1px 0px 5px 0px;
`
const PathPropsRow = styled.div`
  display: flex;
  margin: 8px 0px 8px 0px;
  justify-content: space-around;
  font-size: 12px;
  width: 99%;
`

const OpenedPathInfo = ({ path, sPath, unsetOpenedPath }) => {
  if (path.properties.type === 'short') {
    return <OpenedShortPathInfo path={path} unsetOpenedPath={unsetOpenedPath} />
  } else {
    return <OpenedQuietPathInfo path={path} sPath={sPath} unsetOpenedPath={unsetOpenedPath} />
  }
}

export const OpenedQuietPathInfo = ({ path, sPath, unsetOpenedPath }) => {
  const mdB_diff = path.properties.mdB_diff
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the shortest and the selected quiet path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={sPath.properties.noise_pcts} />
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex >
      <OpenedPathNoiseStats path={path} sPath={sPath} pathType='quiet' />
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
          {Math.abs(mdB_diff) < 1 ? mdB_diff : Math.round(mdB_diff)} dB<sub>mean</sub>
          {' '}({Math.round(path.properties.mdB)}dB)
        </div>
      </PathPropsRow>
    </div>
  )
}

export const OpenedShortPathInfo = ({ path, unsetOpenedPath }) => {
  return (
    <div>
      <PathRowFlex>
        <ClosePathBox handleClick={unsetOpenedPath} />
        <NoiseBarsFlex>
          <BarsLabel>Exposure to different traffic noise levels on the selected (shortest) path: </BarsLabel>
          <PathNoisesBar withMargins={true} noisePcts={path.properties.noise_pcts} />
        </NoiseBarsFlex>
      </PathRowFlex>
      <OpenedPathNoiseStats path={path} pathType='short' />
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
    </div>
  )
}

export default OpenedPathInfo
