import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

const StyledNotificationDiv = styled.div`
  margin: 5px 6px;
  padding: 4px 9px;
  border-radius: 5px;
  width: max-content;
  color: white;
  background: rgba(0, 0, 0, 0.74);
  display: inline-block;
  line-height: 1.5;
  font-size: 23px;
  font-weight: 300;
  letter-spacing: 1.3px;
  max-width: 93%;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.22), 0 6px 20px 0 rgba(0,0,0,0.14);
  ${props => props.look === 'error' && css`
    color: white;
    background-color: #380000bd;
  `}
`

const Notification = (props) => {
  if (!props.notification.text && !props.originTargetError) return null
  const look = props.originTargetError ? 'error' : props.notification.look

  return (
    <StyledNotificationDiv look={look}>
    <div>
      {props.notification.text}
    </div>
    <div>
      {props.originTargetError}
    </div>
    </StyledNotificationDiv>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification,
  originTargetError: state.originTarget.error,
})

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification
