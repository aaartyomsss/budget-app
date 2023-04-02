export enum InvitationStatus {
  REQUEST_SENT = 'SENT',
  REQUEST_ACCEPTED = 'ACCEPTED',
  REQUEST_DECLINED = 'DECLINED',
}

export interface IInvitation {
  id: string
  planId: string
  planName: string
  recepient: string
  requester: string
  status: InvitationStatus
}

export interface Invitation {
  received: IInvitation[]
  sent: IInvitation[]
}
