import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { utils } from './../utils/index'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 10px 10px;
  align-items: center;
`
const StyledPathStats = styled.div`
  display: flex;
  border-radius: 6px;
  margin: 0px 0px;
  background-color: #000000ad;
  padding: 6px 5px 6px 10px;
  color: white;
  width: fit-content;
  ${props => props.green && css`
    margin: 3px 0px;
    background-color: #0e2702c2;
  `}
`
  const StyledPathName = styled.div`
  margin: 0 1px 0 0px;
  font-size: 15px;
  padding: 1px 4px;
  height: fit-content;
`
const StyledLenDiff = styled.div`
  margin: 0 1px 0 0px;
  padding: 1px 4px;
  font-size: 12px;
  height: fit-content;
`
const StyledDb = styled.div`
  border-radius: 4px;
  background-color: #c59300;
  padding: 2px 5px;
  font-size: 12px;
  margin: 2px 3px 2px 3px;
  width: fit-content;
  background-color: #000000db;
`
const StyledDbDiff = styled(StyledDb)`
  background-color: #af2f2f;
  ${props => props.dB < 0 && css`
    background-color: green;
  `}
  ${props => props.dB > 0 && css`
    background-color: #af2f2f;
  `}
  ${props => props.blank === true && css`
    background-color: transparent;
  `}
`
const FlexColsName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 72px;
`
const FlexCols = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 118px;
`
const StyledThDb = styled.div`
  display: flex;
  margin: 0px;
`

const ThDB = ({ dB, value, box }) => {
  const blank = value === 0 || box === false
  return (
    <StyledThDb>
      <StyledDb>
        {dB} dB
      </StyledDb>
      <StyledDbDiff dB={value} blank={blank}>
        {value} m
      </StyledDbDiff>
    </StyledThDb>
  )
}

const ShortPathStats = ({ s_paths }) => {
  const sPath = s_paths[0]
  return (
    <StyledPathStats>
      <FlexColsName>
          <StyledPathName>{utils.getKmFromM(sPath.properties.length)} km </StyledPathName>
          <StyledLenDiff>Shortest</StyledLenDiff>
        </FlexColsName>
          <FlexCols>
            <ThDB box={false} dB={50} value={utils.formatDiffM(sPath.properties.noises[50], false)} m />
            <ThDB box={false} dB={55} value={utils.formatDiffM(sPath.properties.noises[55], false)} m />
          </FlexCols>
          <FlexCols>
            <ThDB box={false} dB={60} value={utils.formatDiffM(sPath.properties.noises[60], false)} m />
            <ThDB box={false} dB={65} value={utils.formatDiffM(sPath.properties.noises[65], false)} m />
          </FlexCols>
          <FlexCols>
            <ThDB box={false} dB={70} value={utils.formatDiffM(sPath.properties.noises[70], false)} m />
            <ThDB box={false} dB={75} value={utils.formatDiffM(sPath.properties.noises[75], false)} m />
          </FlexCols>
    </StyledPathStats>
  )
}

const QuietPathStats = ({ q_paths }) => {
  return (
    <div>
      {q_paths.map(path => (
        <StyledPathStats green key={path.properties.length}>
        <FlexColsName>
          <StyledPathName>{utils.getKmFromM(path.properties.length)} km </StyledPathName>
          <StyledLenDiff>{utils.formatDiffM(path.properties.diff_len, true)} m{' '}</StyledLenDiff>
        </FlexColsName>
          <FlexCols>
            <ThDB dB={50} value={utils.formatDiffM(path.properties.noises_diff[50], true)} m />
            <ThDB dB={55} value={utils.formatDiffM(path.properties.noises_diff[55], true)} m />
          </FlexCols>
          <FlexCols>
            <ThDB dB={60} value={utils.formatDiffM(path.properties.noises_diff[60], true)} m />
            <ThDB dB={65} value={utils.formatDiffM(path.properties.noises_diff[65], true)} m />
          </FlexCols>
          <FlexCols>
            <ThDB dB={70} value={utils.formatDiffM(path.properties.noises_diff[70], true)} m />
            <ThDB dB={75} value={utils.formatDiffM(path.properties.noises_diff[75], true)} m />
          </FlexCols>
        </StyledPathStats>
      )
      )}
    </div>
  )
}

class PathInfo extends Component {
  render() {
    const { pathFC } = this.props.paths
    if (pathFC.features.length === 0) return null
    const s_paths = pathFC.features.filter(feat => feat.properties.type === 'short')
    const q_paths = pathFC.features.filter(feat => feat.properties.type === 'quiet' && feat.properties.diff_len !== 0)

    return (
      <OuterFlex>
        <ShortPathStats s_paths={s_paths} />
        <QuietPathStats q_paths={q_paths} />
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
})

const ConnectedPathInfo = connect(mapStateToProps, null)(PathInfo)
export default ConnectedPathInfo
