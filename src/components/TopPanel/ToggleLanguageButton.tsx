import React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { toggleLanguage, Lang } from './../../reducers/uiReducer'

const StyledButton = styled.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 3px;
  font-size: 20px;
  color: black;
`

const ToggleLanguageButton = (props: PropsFromRedux) => {
  return (
    <StyledButton onClick={() => props.toggleLanguage(props.lang)}>
      {props.lang === Lang.EN ? 'FI' : 'EN'}
    </StyledButton>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.ui.lang
})

const connector = connect(mapStateToProps, { toggleLanguage })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ToggleLanguageButton)