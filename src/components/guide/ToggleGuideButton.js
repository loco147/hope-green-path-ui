import styled, { css } from 'styled-components'

const ToggleGuideButton = styled.div`
  pointer-events: auto;
  cursor: pointer;
  padding: 1px 9px;
  font-weight: 640;
  border-radius: 8px;
  font-size: 22px;
  border: 3px solid black;
  background-color: white;
  color: black;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:before {
    content: '?';
  }
  @media (min-width: 600px) {
    &:hover { 
      background-color: black;
      color: white;
    }
  }
  ${props => props.small === true && css`
    border: 2px solid black;
  `}
`
export default ToggleGuideButton
