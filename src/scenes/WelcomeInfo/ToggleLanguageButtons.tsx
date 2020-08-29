import React from 'react'
import styled, { css } from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { toggleLanguage, Lang } from './../../reducers/uiReducer'

const ButtonPair = styled.div`
  display: flex;
`

const StyledButton = styled.button < { selected: boolean, size: number }> `
  pointer-events: auto;
  cursor: pointer;
  padding: 3px 1px 2px 1px;
  font-size: 18px;
  color: black;
  text-decoration: none;
  font-weight: 400;
  font-size: ${props => props.size ? props.size : '16'}px;
  background-color: white;
  margin: 2px 3px 2px 3px;
  border: 1px solid white;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  ${props => props.selected && css`
    border-bottom: 1px solid black;
  `}
  @media (min-width: 600px) {
    &:hover {
      border-bottom: 1px solid black;
    }
  }
`

const ToggleLanguageButtons = (props: PropsFromRedux & { size: number }) => {
  return (
    <ButtonPair>
      <StyledButton
        id='set-lang-fi-button'
        size={props.size}
        disabled={props.lang === Lang.FI}
        selected={props.lang === Lang.FI}
        onClick={() => props.toggleLanguage(props.lang)}>
        FI
        </StyledButton>
      <StyledButton
        id='set-lang-en-button'
        size={props.size}
        disabled={props.lang === Lang.EN}
        selected={props.lang === Lang.EN}
        onClick={() => props.toggleLanguage(props.lang)}>
        EN
      </StyledButton>
    </ButtonPair>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.ui.lang
})

const connector = connect(mapStateToProps, { toggleLanguage })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ToggleLanguageButtons)