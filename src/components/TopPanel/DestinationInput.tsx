import React, { Component, RefObject } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { IoIosClose } from 'react-icons/io'
import {
  setDestinationInputText,
  setGeocodedDestination,
  hideDestinationOptions,
  toggleDestinationOptionsVisible,
  resetDestinationInput,
} from '../../reducers/destinationReducer'

const DestSelectorDiv = styled.div`
  margin: 5px 5px 5px 5px;
  position: relative;
  width: 90%;
  max-width: 350px;
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
const DestinationOptions = styled.ul`
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
const DestinationOption = styled.li`
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

class DestinationInput extends Component<PropsFromRedux> {
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
      this.props.hideDestinationOptions()
    }
  }

  render() {
    const { destInputText, destOptionsVisible, destOptions } = this.props.destination
    const {
      originObject,
      setDestinationInputText,
      setGeocodedDestination,
      resetDestinationInput,
      toggleDestinationOptionsVisible
    } = this.props

    return <DestSelectorDiv ref={this.wrapperRef}>
      <Input
        placeholder='To'
        type='text'
        value={destInputText}
        onClick={toggleDestinationOptionsVisible}
        onChange={setDestinationInputText} />
      <ResetLocButton onClick={resetDestinationInput}><CloseIcon /></ResetLocButton>
      {destOptionsVisible && <DestinationOptions>
        {destOptions.map(option =>
          <DestinationOption
            key={option.properties.gid}
            onClick={() => setGeocodedDestination(option, originObject)}>{option.properties.label}</DestinationOption>
        )}
      </DestinationOptions>
      }
    </DestSelectorDiv >
  }
}

const mapStateToProps = (state: ReduxState) => ({
  destination: state.destination,
  originObject: state.origin.originObject
})

const mapDispatchToProps = {
  setDestinationInputText,
  setGeocodedDestination,
  hideDestinationOptions,
  toggleDestinationOptionsVisible,
  resetDestinationInput,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(DestinationInput)
