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
    animation: ${spin} 0.9s linear infinite;
  }
`

const StyledLoadingIcon = styled(LoadingIcon)<{size?: number}>`
  ${props => props.size && css<{size?: number}>`
    height: ${props => props.size || '50'}px;
    width: auto;
    `}
`

const LoadAnimation = ({ size }: { size: number }) => {

  return (
    <Spinner>
      <StyledLoadingIcon size={size} />
    </Spinner>
  )
}

export default LoadAnimation