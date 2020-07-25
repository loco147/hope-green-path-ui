import React from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { resetPaths } from '../../reducers/pathsReducer'
import { IoIosArrowBack } from 'react-icons/io'

const ButtonContainer = styled.div`
  padding: 2px 3px 2px 0px;
  margin: 1px 5px 1px 10px; 
  cursor: pointer;
  pointer-events: auto;
  border-radius: 5px;
  border: 1px solid white;
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s; /* Safari */
  @media (min-width: 550px) {
    &:hover { 
      background: #f5f5f5c4;
      border-color: #f5f5f5c4;
    }
  }
`

const ArrowBack = styled(IoIosArrowBack)`
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  font-size: 31px;
`

const ResetPathsButton = ({ resetPaths, userLocation }: PropsFromRedux) => {
  return (
    <ButtonContainer onClick={() => resetPaths(userLocation.lngLat)}>
      <ArrowBack />
    </ButtonContainer>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  userLocation: state.userLocation
})

const connector = connect(mapStateToProps, { resetPaths })
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ResetPathsButton)
