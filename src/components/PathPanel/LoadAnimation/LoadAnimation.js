import React from 'react'
import styled, { keyframes } from 'styled-components'
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px 0px 20px 0px;
`

const LoadAnimation = () => {
  return (
    <LoadingContainer>
      <Spinner>
        <LoadingIcon />
      </Spinner>
    </LoadingContainer>
  )
}

export default LoadAnimation