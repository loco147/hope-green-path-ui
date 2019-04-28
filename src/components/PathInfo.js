import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { utils } from './../utils/index'
import { setSelectedPath, resetPaths } from './../reducers/pathsReducer'
import { Button } from './Button'

const BottomControlPanel = styled.div`
  background: rgba(255,255,255,0.85);
  height: 53px;
  width: 100%;
  margin-left: 0px;
  display: flex;
  @media (min-width: 444px) {
    border-top-right-radius: 15px;
  }
`
const BottomControlFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 96px;
  @media (min-width: 600px) {
    justify-content: flex-start;
    margin-left: 145px;
  }
`
const PathPanel = styled.div`
  margin: 0px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  max-height: calc(100vh - 121px);
  background: rgba(255,255,255,0.85);
  overflow: auto;
  pointer-events: auto;
  width: fit-content;
  padding: 10px 10px 0px 10px;
  @media (max-width: 444px) {
    max-height: 220px;
  }
`
const StyledPathStats = styled.div`
  display: flex;
  pointer-events: auto;
  min-width: 331px;
  height: 67px;
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
      cursor: pointer;
      @media (min-width: 644px) {
        background-color: #2d2a00c2;
      }
    }
  `}
  ${props => props.selected === true && css`
    border: 2px solid yellow;
    background-color: #2d2a00c2;
    &:hover { 
      cursor: pointer;
      @media (min-width: 644px) {
        background-color: #0e2702c2;
      }
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
const Key = styled.div`
  border-radius: 4px;
  background-color: #c59300;
  padding: 2px 5px;
  font-size: 12px;
  margin: 2px 3px 2px 3px;
  background-color: #000000db;
`
const LenDiffBox = styled(Key)`
  background-color: transparent;
  ${props => props.value < 0 && css`
    background-color: green;
  `}
  ${props => props.value > 0 && css`
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
  padding: 0px 1px 0px 1px;
  justify-content: space-evenly;
`
const KeyValueFlex = styled.div`
  display: flex;
  margin: 0px;
  white-space: nowrap;
`

const KeyValuePair = ({ prop, value, box, unit }) => {
  const blank = value === 0 || box === false
  return (
    <KeyValueFlex>
      <Key>{prop}</Key>
      <LenDiffBox value={value} blank={blank}>{value} {unit}</LenDiffBox>
    </KeyValueFlex>
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
        <KeyValuePair prop={'En'} value={sPath.properties.nei_norm} />
        <KeyValuePair prop={'Ec'} value={Math.round(sPath.properties.nei)} />
      </FlexCols>
      <FlexCols>
        <KeyValuePair box={false} prop={50} value={utils.formatDiffM(sPath.properties.noises[50], false)} unit={'m'} />
        <KeyValuePair box={false} prop={55} value={utils.formatDiffM(sPath.properties.noises[55], false)} unit={'m'} />
        <KeyValuePair box={false} prop={60} value={utils.formatDiffM(sPath.properties.noises[60], false)} unit={'m'} />
      </FlexCols>
      <FlexCols>
        <KeyValuePair box={false} prop={65} value={utils.formatDiffM(sPath.properties.noises[65], false)} unit={'m'} />
        <KeyValuePair box={false} prop={70} value={utils.formatDiffM(sPath.properties.noises[70], false)} unit={'m'} />
        <KeyValuePair box={false} prop={75} value={utils.formatDiffM(sPath.properties.noises[70], false)} unit={'m'} />
      </FlexCols>
    </StyledPathStats>
  )
}

class PathInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathStatsVisible: true
    }
  }

  togglePathStatsVisibility = () => {
    this.setState({ pathStatsVisible: !this.state.pathStatsVisible })
  }

  render() {
    const { sPathFC, qPathFC, selPathFC, setSelectedPath, resetPaths, detourLimit } = this.props
    if (sPathFC.features.length === 0) { return null }

    let selPathId = 'none'
    if (selPathFC.features.length > 0) {
      selPathId = selPathFC.features[0].properties.id
    }

    const qPaths = qPathFC.features.filter(path => path.properties.len_diff < detourLimit)

    return (
      <div>
        {this.state.pathStatsVisible
          ? <PathPanel>
            <ShortPathStats selPathId={selPathId} s_paths={sPathFC.features} setSelectedPath={setSelectedPath} />
            {qPaths.map(path => (
              <StyledPathStats quiet selected={path.properties.id === selPathId} key={path.properties.length} onClick={() => setSelectedPath(path.properties.id)}>
                <PathInfoFlex>
                  <PathName>{utils.getKmFromM(path.properties.length)} km </PathName>
                  <LenDiff>{utils.formatDiffM(path.properties.len_diff, true)} m{' '}</LenDiff>
                  <LenDiff>S. {path.properties.path_score}</LenDiff>
                </PathInfoFlex>
                <FlexCols>
                  <KeyValuePair prop={'En'} value={path.properties.nei_norm} />
                  <KeyValuePair prop={'Ec'} value={Math.round(path.properties.nei)} />
                  <KeyValuePair prop={'Ed'} value={Math.round(path.properties.nei_diff_rat)} unit={'%'} />
                </FlexCols>
                <FlexCols>
                  <KeyValuePair prop={50} value={utils.formatDiffM(path.properties.noises_diff[50], true)} unit={'m'} />
                  <KeyValuePair prop={55} value={utils.formatDiffM(path.properties.noises_diff[55], true)} unit={'m'} />
                  <KeyValuePair prop={60} value={utils.formatDiffM(path.properties.noises_diff[60], true)} unit={'m'} />
                </FlexCols>
                <FlexCols>
                  <KeyValuePair prop={65} value={utils.formatDiffM(path.properties.noises_diff[65], true)} unit={'m'} />
                  <KeyValuePair prop={70} value={utils.formatDiffM(path.properties.noises_diff[70], true)} unit={'m'} />
                  <KeyValuePair prop={75} value={utils.formatDiffM(path.properties.noises_diff[75], true)} unit={'m'} />
                </FlexCols>
              </StyledPathStats>
            )
            )}
          </PathPanel>
          : null
        }
        <BottomControlPanel>
          <BottomControlFlex>
            <Button small onClick={this.togglePathStatsVisibility}> {this.state.pathStatsVisible ? 'Hide stats' : 'Show stats'}</Button>
            <Button small blue onClick={() => resetPaths()}> Reset</Button>
          </BottomControlFlex>
        </BottomControlPanel>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sPathFC: state.paths.sPathFC,
  qPathFC: state.paths.qPathFC,
  selPathFC: state.paths.selPathFC,
  detourLimit: state.paths.detourLimit,
})

const ConnectedPathInfo = connect(mapStateToProps, { setSelectedPath, resetPaths })(PathInfo)
export default ConnectedPathInfo
