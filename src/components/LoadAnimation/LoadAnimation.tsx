import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { LoadingIcon } from './LoadingIcon'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  svg {
    display: block;
    animation: ${spin} 1.3s linear infinite;
  }
`

const StyledLoadingIcon = styled(LoadingIcon)`   
  ${props => props.size && css`
    height: ${props => props.size || '50'}px;
    width: auto;
    `}
`

const LoadAnimation = ({ size }) => {

  return (
    <Spinner>
      <StyledLoadingIcon size={size} />
    </Spinner>
  )
}

export default LoadAnimation