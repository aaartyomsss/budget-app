import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addAcceptedPlan } from '../../../../reducers/familyPlanReducer'
import { answerRequest } from '../../../../reducers/invitationReducer'
import familyPlanRequestService from '../../../../services/familyPlanRequestService'
import '../assets/MyInvitations.css'

const REQUEST_ACCEPTED = 'ACCEPTED'
const REQUEST_DECLINED = 'DECLINED'
const REQUEST_SENT = 'SENT'

const MyInvitations = ({ invitationsReceived, user }) => {
  const dispatch = useDispatch()
  const handleInvitation = async (answer, requestId) => {
    const data = await familyPlanRequestService.answerRequest(
      answer,
      user.id,
      requestId
    )
    dispatch(answerRequest(answer, requestId))
    if (answer === REQUEST_ACCEPTED && data) dispatch(addAcceptedPlan(data))
  }

  if (invitationsReceived.length === 0) {
    return <div>You have no more invites</div>
  }

  return (
    <div className='container'>
      {invitationsReceived &&
        invitationsReceived.map((invite) => {
          if (invite.status === REQUEST_SENT) {
            return (
              <MyInvitationCard
                invite={invite}
                handleInvitation={handleInvitation}
                key={invite.id}
              />
            )
          }
          return <></>
        })}
    </div>
  )
}

const MyInvitationCard = ({ invite, handleInvitation }) => {
  const { planName, requester } = invite
  const { username } = requester
  return (
    <div className='card-container'>
      <span className='card-text'>
        You have been invite to {planName} by <strong>{username}</strong>
      </span>
      <span className='btn-container'>
        <Button
          type='primary'
          onClick={() => handleInvitation(REQUEST_ACCEPTED, invite.id)}
        >
          Accept
        </Button>
        <Button
          danger
          type='primary'
          onClick={() => handleInvitation(REQUEST_DECLINED, invite.id)}
        >
          Decline
        </Button>
      </span>
    </div>
  )
}

export default MyInvitations
