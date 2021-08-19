import React from 'react';
import { Button } from 'antd';
import '../assets/InviteUserCard.css';

const InviteUserCard = ({ foundUser, invitations, sendInvite }) => {
  const { id, username } = foundUser;
  const isInviteSent = invitations.filter(
    (invitation) => invitation.recepient === id
  );
  return (
    <div className="card-div">
      <span>{username}</span>
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
  );
};

export default InviteUserCard;
