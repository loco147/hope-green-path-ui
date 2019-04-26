import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { utils } from './../utils/index'
import { setSelectedPath } from './../reducers/pathsReducer'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px;
  max-height: calc(100vh - 42px);
  overflow: auto;
  pointer-events: auto;
  background: rgba(0,0,0,0.1);
  padding: 5px 5px 2px 5px;
  border-radius: 8px;
  width: fit-content;
  @media (max-width: 710px) {
    max-height: 220px;
    max-width: calc(100% - 17px);
  }
`
const StyledPathStats = styled.div`
  display: flex;
  width: max-content;
  border-radius: 6px;
  margin: 0px 0px;
  background-color: rgba(0,0,0,0.67);
  border: 2px solid transparent;
  padding: 6px 5px;
  color: white;
  cursor: default;
  transition-duration: 0.15s;
  ${props => props.quiet && css`
    margin: 3px 0px;
    background-color: #0e2702c2;
    &:hover { 
      background-color: #2d2a00c2;
      cursor: pointer;
    }
  `}
  ${props => props.selected === true && css`
    border: 2px solid yellow;
    background-color: #2d2a00c2;
    &:hover { 
      background-color: #0e2702c2;
      cursor: pointer;
    }
  `}
`
const PathName = styled.div`
  margin: 0 1px 0 0px;
  font-size: 15px;
  padding: 1px 4px;
  white-space: nowrap;
`
const LenDiff = styled.div`
  margin: 0 1px 0 0px;
  padding: 1px 4px;
  font-size: 12px;
  white-space: nowrap;
`
const Db = styled.div`
  border-radius: 4px;
  background-color: #c59300;
  padding: 2px 5px;
  font-size: 12px;
  margin: 2px 3px 2px 3px;
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
  width: 70px;
`
const FlexCols = styled.div`
  display: flex;
  flex-direction: column;
  width: 111px;
`
const DbLenFlex = styled.div`
  display: flex;
  margin: 0px;
  white-space: nowrap;
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

const ShortPathStats = ({ s_paths }) => {
  const sPath = s_paths[0]
  return (
    <StyledPathStats>
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
        {qPathFC.features.map(path => (
          <StyledPathStats quiet selected={path.properties.id === selPathId} key={path.properties.length} onClick={() => setSelectedPath(path.properties.id)}>
            <PathInfoFlex>
              <PathName>{utils.getKmFromM(path.properties.length)} km </PathName>
              <LenDiff>{utils.formatDiffM(path.properties.diff_len, true)} m{' '}</LenDiff>
            </PathInfoFlex>
            <FlexCols>
              <DbLenPair dB={50} value={utils.formatDiffM(path.properties.noises_diff[50], true)} />
              <DbLenPair dB={55} value={utils.formatDiffM(path.properties.noises_diff[55], true)} />
            </FlexCols>
            <FlexCols>
              <DbLenPair dB={60} value={utils.formatDiffM(path.properties.noises_diff[60], true)} />
              <DbLenPair dB={65} value={utils.formatDiffM(path.properties.noises_diff[65], true)} />
            </FlexCols>
            <FlexCols>
              <DbLenPair dB={70} value={utils.formatDiffM(path.properties.noises_diff[70], true)} />
              <DbLenPair dB={75} value={utils.formatDiffM(path.properties.noises_diff[75], true)} />
            </FlexCols>
          </StyledPathStats>
        )
        )}
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
