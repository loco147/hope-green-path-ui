import React from 'react'
import styled, { css } from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import OriginInput from './OriginInput'

const OdContainer = styled.div<{ hide?: boolean }>`
  pointer-events: auto;
  padding: 5px 0 0 0;
  display: flex;
  justify-content: center;
  ${props => props.hide === true && css`
    display: none;
  `}
`

const OrigDestPanel = (props: PropsFromRedux) => {
  const { showingPaths, waitingPaths } = props

  return (
    <OdContainer hide={waitingPaths || showingPaths}>
      <OriginInput />
    </OdContainer>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  waitingPaths: state.paths.waitingPaths,
  showingPaths: state.paths.showingPaths
})


const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(OrigDestPanel)
