import familyPlanRequestService from '../services/familyPlanRequestService'

const invitationReducer = (state = { sent: [], received: [] }, action) => {
  switch (action.type) {
    case SET_SENT_REQUESTS:
      return { ...state, sent: action.data }
    case SEND_REQUEST:
      return { ...state, sent: state.sent.concat(action.data) }
    case SET_RECEIVED_REQUESTS:
      return { ...state, received: action.data }
    case ANSWER_REQUEST:
      return {
        ...state,
        received: state.received.map((invitation) => {
          if (invitation.id === action.data.requestId) {
            invitation.status = action.data.answer
          }
          return invitation
        }),
      }
    default:
      return state
  }
}

export const setSentRequests = (userId) => {
  return async (dispatch) => {
    const data = await familyPlanRequestService.getSentRequests(userId)
    dispatch({ type: SET_SENT_REQUESTS, data })
  }
}

export const sendRequest = (params) => {
  return async (dispatch) => {
    const data = await familyPlanRequestService.sendRequest(params)
    dispatch({ type: SEND_REQUEST, data })
  }
}

export const setReceivedRequests = (userId) => {
  return async (dispatch) => {
    const data = await familyPlanRequestService.getReceivedRequests(userId)
    dispatch({ type: SET_RECEIVED_REQUESTS, data })
  }
}
export const answerRequest = (answer, requestId) => {
  const data = { answer, requestId }
  return { type: ANSWER_REQUEST, data }
}

const SET_SENT_REQUESTS = 'SET_SENT_REQUESTS'
const SEND_REQUEST = 'SEND_REQUEST'
const SET_RECEIVED_REQUESTS = 'SET_RECEIVED_REQUESTS'
const ANSWER_REQUEST = 'ANSWER_REQUEST'

export default invitationReducer
