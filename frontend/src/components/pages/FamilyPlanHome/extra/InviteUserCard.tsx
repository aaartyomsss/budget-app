import React from 'react'
import { Button } from 'antd'
import '../assets/InviteUserCard.css'

const InviteUserCard = ({ foundUser, invitations, sendInvite }) => {
  const { id, username } = foundUser
  // TODO fix invitation is sent logic
  const isInviteSent = invitations.filter(
    (invitation) => invitation.recepient === id && invitation.status === 'SENT'
  )
  return (
    <div className="card-div">
      <span className="card-text">{username}</span>
      <span></span>
      {isInviteSent.length === 0 ? (
        <Button type="primary" size="small" onClick={() => sendInvite(id)}>
          Invite
        </Button>
      ) : (
        <Button type="primary" size="small" disabled>
          Invite was sent
        </Button>
      )}
    </div>
  )
}

export default InviteUserCard
