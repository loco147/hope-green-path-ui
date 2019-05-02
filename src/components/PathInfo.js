import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { utils } from './../utils/index'
import { setSelectedPath, resetPaths } from './../reducers/pathsReducer'
import { Button } from './Button'
import { IconDiv, Star } from './Icons'

const BottomControlPanel = styled.div`
  background: rgba(255,255,255,0.95);
  height: 53px;
  width: 100%;
  margin-left: 0px;
  display: flex;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  border: 1px solid #d0d0d0;
  @media (min-width: 444px) {
    border-top-right-radius: 15px;
  }
`
const BottomControlFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media (min-width: 600px) {
    justify-content: flex-start;
    margin-left: 145px;
  }
`
const PathPanel = styled.div.attrs(props => ({
    style: ({ display: props.visible ? '' : 'none', })
  })
)`
  margin: 0px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  max-height: calc(100vh - 121px);
  background: rgba(255,255,255,0.95);
  overflow: auto;
  pointer-events: auto;
  width: fit-content;
  padding: 10px 10px 0px 10px;
  box-shadow: 0 -4px 8px 0 rgba(0,0,0,0.07), 0 -6px 20px 0 rgba(0,0,0,0.04);
  @media (max-width: 544px) {
    max-height: 220px;
  }
`
const StyledPathStats = styled.div.attrs(props => ({
  style:
    ({
      border: props.selected ? '2px solid #ed7b00' : '',
      boxShadow: props.selected ? '0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.25)' : ''
    })
})
)`
  display: flex;
  pointer-events: auto;
  min-width: 331px;
  height: 67px;
  border-radius: 6px;
  margin: 0px 0px;
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.15s;
  box-shadow: 0 -1px 7px 0 rgba(0,0,0,0.3), 0 3px 3px 0 rgba(0,0,0,0.2);
  &:hover { 
    cursor: pointer;
    @media (min-width: 644px) {
      box-shadow: 0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.25);
    }
  }
  @media (max-width: 372px) {
    min-width: min-content;
  }
  ${props => props.quiet && css`
    margin: 9px 0px;
  `}
  ${props => props.onlyShort === true && css`
    margin: 0px 0px 9px 0px;
  `}
`
const PathName = styled.div`
  margin: 0 1px 0 1px;
  font-size: 15px;
  padding: 1px 4px;
  white-space: nowrap;
`
const LenDiff = styled.div`
  margin: 0 1px 0 3px;
  padding: 1px 4px;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  ${props => props.bold && css`
    font-weight: 500;
`}
`
const Key = styled.div`
  border-radius: 4px;
  background-color: #c59300;
  padding: 2px 5px;
  color: white;
  font-size: 12px;
  margin: 2px 3px 2px 3px;
  background-color: #000000db;
`
const ValueBox = styled(Key)`
  background-color: transparent;
  color: black;
  ${props => props.value < 0 && css`
    background-color: green;
    color: white;
  `}
  ${props => props.value > 0 && css` background-color: transparent;`}
  ${props => props.blank === true && css` background-color: transparent;`}
  ${props => props.en && css`
    ${props => props.value < 0.25 && css` background-color: #ade2ad;`}
    ${props => props.value >= 0.25 && css` background-color: #f2db5d;`}
    ${props => props.value >= 0.5 && css` background-color: #ffba3d;`}
    ${props => props.value >= 0.7 && css` background-color: #ff8173;`}
  `}
`
const PathInfoFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 66px;
`
const FlexCols = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 1px 0px 1px;
  justify-content: space-evenly;
  ${props => props.hideOnSmallScreen && css`
    @media (max-width: 372px) {
      display: none;
    }
`}
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
      <ValueBox value={value} blank={blank}>{value} {unit}</ValueBox>
    </KeyValueFlex>
  )
}

const ShortPathStats = ({ sPaths, selPathId, setSelectedPath, qPaths }) => {
  const sPath = sPaths[0]
  const onlyShort = qPaths.length === 0
  return (
    <StyledPathStats onlyShort={onlyShort} selected={sPath.properties.id === selPathId} onClick={() => setSelectedPath(sPath.properties.id)} >
      <PathInfoFlex>
        <PathName>{utils.getKmFromM(sPath.properties.length)} km </PathName>
        <LenDiff bold>Shortest</LenDiff>
      </PathInfoFlex>
      <FlexCols>
        <KeyValueFlex> <Key>Et</Key> <ValueBox>{Math.round(sPath.properties.nei)}</ValueBox> </KeyValueFlex>
        <KeyValueFlex> <Key>En</Key> <ValueBox en value={sPath.properties.nei_norm}>{sPath.properties.nei_norm}</ValueBox> </KeyValueFlex>
      </FlexCols>
      <FlexCols hideOnSmallScreen>
        <KeyValuePair box={false} prop={50} value={utils.formatDiffM(sPath.properties.noises[50], false)} unit={'m'} />
        <KeyValuePair box={false} prop={55} value={utils.formatDiffM(sPath.properties.noises[55], false)} unit={'m'} />
        <KeyValuePair box={false} prop={60} value={utils.formatDiffM(sPath.properties.noises[60], false)} unit={'m'} />
      </FlexCols>
      <FlexCols>
        <KeyValuePair box={false} prop={65} value={utils.formatDiffM(sPath.properties.noises[65], false)} unit={'m'} />
        <KeyValuePair box={false} prop={70} value={utils.formatDiffM(sPath.properties.noises[70], false)} unit={'m'} />
        <KeyValuePair box={false} prop={75} value={utils.formatDiffM(sPath.properties.noises[75], false)} unit={'m'} />
      </FlexCols>
    </StyledPathStats >
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
        <PathPanel visible={this.state.pathStatsVisible}>
          <ShortPathStats selPathId={selPathId} sPaths={sPathFC.features} setSelectedPath={setSelectedPath} qPaths={qPaths} />
          {qPaths.map(path => (
            <StyledPathStats quiet selected={path.properties.id === selPathId} key={path.properties.length} onClick={() => setSelectedPath(path.properties.id)}>
              <PathInfoFlex>
                <PathName>{utils.getKmFromM(path.properties.length)} km </PathName>
                <LenDiff>{utils.formatDiffM(path.properties.len_diff, true)} m{' '}</LenDiff>
                <LenDiff bold>{path.properties.path_score}<IconDiv><Star /></IconDiv></LenDiff>
              </PathInfoFlex>
              <FlexCols>
                <KeyValueFlex> <Key>Et</Key> <ValueBox>{Math.round(path.properties.nei)}</ValueBox> </KeyValueFlex>
                <KeyValuePair prop={'Ed'} value={Math.round(path.properties.nei_diff_rat)} unit={'%'} />
                <KeyValueFlex> <Key>En</Key> <ValueBox en value={path.properties.nei_norm}>{path.properties.nei_norm}</ValueBox> </KeyValueFlex>
              </FlexCols>
              <FlexCols hideOnSmallScreen>
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
