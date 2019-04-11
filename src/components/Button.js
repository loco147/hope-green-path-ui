import styled, { css } from 'styled-components'
import { bool } from 'prop-types'

export const Button = styled.div.attrs(props => ({
  style: ({ display: props.visible ? '' : 'none', })
})
)`
  cursor: pointer;
  padding: 6px 13px;
  color: white;
  border: 1px solid;
  border-radius: 8px;
  background-color: #17af40e8;
  margin: 5px 6px;
  font-weight: 400;
  font-size: 28px;
  width: max-content;
  letter-spacing: 1px;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:hover { 
    background-color: #119034e8;
  }
  ${props => props.setLoc && css`
    background-color: #17af40e8;
    color: white;
    font-size: 18px;
    &:hover { 
      background-color: #128a32e8;
    }
`}
`
Button.propTypes = {
  visible: bool
}

Button.defaultProps = {
  visible: true
}
