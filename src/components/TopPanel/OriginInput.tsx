import React, { Component, RefObject } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import UseCurrLocButton from './UseCurrLocButton'
import {
  setOrigInputText,
  setGeocodedOrigin,
  hideOriginOptions,
  toggleOriginOptionsVisible,
  resetOriginInput,
  useUserLocationOrigin
} from '../../reducers/originReducer'
import LoadAnimation from './../LoadAnimation/LoadAnimation'

const OrigSelectorDiv = styled.div`
  margin: 5px 5px 5px 5px;
  position: relative;
  width: 90%;
  z-index: 2;
`
const Input = styled.input<{ onChange: Function }>`
  padding: 10px 10px 9px 10px;
  width: calc(100% - 20px);
  color: black;
  background: white;
  border: 1px solid black;
  font-size: 17px;
  border-radius: 3px;
`
const WaitForUserLocContainer = styled.span`
  position: absolute;
  top: 8px;
  left: 20px;
`
const ResetLocButton = styled.span`
  cursor: pointer;
  position: absolute;
  pointer-events: auto;
  display: table;
  color: black;
  border-radius: 7px;
  top: 0px;
  right: 0px;
`
const CloseIcon = styled(IoIosClose)`
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  font-size: 41px;
`
const OrigOptions = styled.ul`
  z-index: -1;
  border-radius: 0 0 4px 4px;
  line-height: 1.5;
  padding: 0;
  padding-top: 2px;
  margin: -3px 0px 0px 1px;
  list-style-type: none;
  font-weight: normal;
  cursor: pointer;
  position: absolute;
  width: calc(100% - 1px);
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const OrigOption = styled.li`
  padding: 3px 8px;
  margin: 9px;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.06);
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s; /* Safari */
  @media (min-width: 600px) {
    &:hover {
      box-shadow: 0 2px 3px 0 rgba(0,0,0,0.15), 0 2px 3px 0 rgba(0,0,0,0.1);
    }
  }
`

class OriginInput extends Component<PropsFromRedux> {
  wrapperRef: RefObject<HTMLDivElement>
  constructor(props: PropsFromRedux) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  handleClickOutside(event: any) {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      console.log('Clicked outside origin');
      this.props.hideOriginOptions()
    }
  }

  render() {
    const { waitingUserLocOrigin, origInputText, origOptionsVisible, origOptions } = this.props.origin
    const { useUserLocationOrigin, setOrigInputText, setGeocodedOrigin, resetOriginInput, toggleOriginOptionsVisible } = this.props

    return <OrigSelectorDiv ref={this.wrapperRef}>
      <Input
        placeholder='From'
        type='text'
        value={origInputText}
        onClick={toggleOriginOptionsVisible}
        onChange={setOrigInputText} />
      {waitingUserLocOrigin && <WaitForUserLocContainer ><LoadAnimation size={25} /></WaitForUserLocContainer>}
      <ResetLocButton onClick={resetOriginInput}><CloseIcon /></ResetLocButton>
      {origOptionsVisible && <OrigOptions>
        <OrigOption onClick={(e) => useUserLocationOrigin(e, this.props.userLocation)}>
          <UseCurrLocButton handleClick={(e) => useUserLocationOrigin(e, this.props.userLocation)} />
        </OrigOption>
        {origOptions.map(option =>
          <OrigOption
            key={option.properties.gid}
            onClick={() => setGeocodedOrigin(option)}>{option.properties.label}</OrigOption>
        )}
      </OrigOptions>
      }
    </OrigSelectorDiv >
  }
}

const mapStateToProps = (state: ReduxState) => ({
  userLocation: state.userLocation,
  origin: state.origin,
})

const mapDispatchToProps = {
  useUserLocationOrigin,
  setOrigInputText,
  setGeocodedOrigin,
  hideOriginOptions,
  toggleOriginOptionsVisible,
  resetOriginInput
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(OriginInput)
