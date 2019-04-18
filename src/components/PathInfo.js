import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { utils } from './../utils/index'
import { setSelectedPath } from './../reducers/pathsReducer'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  max-height: 255px;
  overflow: auto;
  pointer-events: auto;
  width: max-content;
  background: rgba(0,0,0,0.1);
  padding: 5px;
  border-radius: 8px;
`
const StyledPathStats = styled.div`
  display: flex;
  border-radius: 6px;
  margin: 0px 0px;
  background-color: rgba(0,0,0,0.67);
  border: 2px solid transparent;
  padding: 6px 5px 6px 10px;
  color: white;
  width: fit-content;
  ${props => props.green && css`
    margin: 3px 0px;
    background-color: #0e2702c2;
    `}
  ${props => props.selected === true && css`
    border: 2px solid yellow;
  `}
`
const PathName = styled.div`
  margin: 0 1px 0 0px;
  font-size: 15px;
  padding: 1px 4px;
  height: fit-content;
`
const LenDiff = styled.div`
  margin: 0 1px 0 0px;
  padding: 1px 4px;
  font-size: 12px;
  height: fit-content;
`
const Db = styled.div`
  border-radius: 4px;
  background-color: #c59300;
  padding: 2px 5px;
  font-size: 12px;
  margin: 2px 3px 2px 3px;
  width: fit-content;
  background-color: #000000db;
`
const LenDiffBox = styled(Db)`
  background-color: transparent;
  ${props => props.dB < 0 && css`
    background-color: green;
  `}
  ${props => props.dB > 0 && css`
    background-color: transparent;
  `}
  ${props => props.blank === true && css`
    background-color: transparent;
  `}
`
const PathInfoFlex = styled.div`
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
const DbLenFlex = styled.div`
  display: flex;
  margin: 0px;
`

const DbLenPair = ({ dB, value, box }) => {
  const blank = value === 0 || box === false
  return (
    <DbLenFlex>
      <Db> {dB} dB</Db>
      <LenDiffBox dB={value} blank={blank}>{value} m</LenDiffBox>
    </DbLenFlex>
  )
}

const ShortPathStats = ({ s_paths, setSelectedPath, selPathId }) => {
  const sPath = s_paths[0]
  return (
    <StyledPathStats selected={sPath.properties.id === selPathId} onClick={() => setSelectedPath(sPath)}>
      <PathInfoFlex>
        <PathName>{utils.getKmFromM(sPath.properties.length)} km </PathName>
        <LenDiff>Shortest</LenDiff>
      </PathInfoFlex>
      <FlexCols>
        <DbLenPair box={false} dB={50} value={utils.formatDiffM(sPath.properties.noises[50], false)} m />
        <DbLenPair box={false} dB={55} value={utils.formatDiffM(sPath.properties.noises[55], false)} m />
      </FlexCols>
      <FlexCols>
        <DbLenPair box={false} dB={60} value={utils.formatDiffM(sPath.properties.noises[60], false)} m />
        <DbLenPair box={false} dB={65} value={utils.formatDiffM(sPath.properties.noises[65], false)} m />
      </FlexCols>
      <FlexCols>
        <DbLenPair box={false} dB={70} value={utils.formatDiffM(sPath.properties.noises[70], false)} m />
        <DbLenPair box={false} dB={75} value={utils.formatDiffM(sPath.properties.noises[75], false)} m />
      </FlexCols>
    </StyledPathStats>
  )
}

const QuietPathStats = ({ q_paths, setSelectedPath, selPathId }) => {
  return (
    <div>
      {q_paths.map(path => (
        <StyledPathStats green selected={path.properties.id === selPathId} key={path.properties.length} onClick={() => setSelectedPath(path)}>
          <PathInfoFlex>
            <PathName>{utils.getKmFromM(path.properties.length)} km </PathName>
            <LenDiff>{utils.formatDiffM(path.properties.diff_len, true)} m{' '}</LenDiff>
          </PathInfoFlex>
          <FlexCols>
            <DbLenPair dB={50} value={utils.formatDiffM(path.properties.noises_diff[50], true)} m />
            <DbLenPair dB={55} value={utils.formatDiffM(path.properties.noises_diff[55], true)} m />
          </FlexCols>
          <FlexCols>
            <DbLenPair dB={60} value={utils.formatDiffM(path.properties.noises_diff[60], true)} m />
            <DbLenPair dB={65} value={utils.formatDiffM(path.properties.noises_diff[65], true)} m />
          </FlexCols>
          <FlexCols>
            <DbLenPair dB={70} value={utils.formatDiffM(path.properties.noises_diff[70], true)} m />
            <DbLenPair dB={75} value={utils.formatDiffM(path.properties.noises_diff[75], true)} m />
          </FlexCols>
        </StyledPathStats>
      )
      )}
    </div>
  )
}

class PathInfo extends Component {
  render() {
    const { sPathFC, qPathFC, selPathFC, setSelectedPath } = this.props
    if (sPathFC.features.length === 0) { return null }

    let selPathId = 'none'
    if (selPathFC.features.length > 0) {
      selPathId = selPathFC.features[0].properties.id
    }

    return (
      <OuterFlex>
        <ShortPathStats selPathId={selPathId} s_paths={sPathFC.features} setSelectedPath={setSelectedPath} />
        <QuietPathStats selPathId={selPathId} q_paths={qPathFC.features} setSelectedPath={setSelectedPath} />
      </OuterFlex>
    )
  }
}

const mapStateToProps = (state) => ({
  sPathFC: state.paths.sPathFC,
  qPathFC: state.paths.qPathFC,
  selPathFC: state.paths.selPathFC,
})

const ConnectedPathInfo = connect(mapStateToProps, { setSelectedPath })(PathInfo)
export default ConnectedPathInfo
