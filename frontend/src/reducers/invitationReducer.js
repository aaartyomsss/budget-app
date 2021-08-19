import familyPlanRequestService from '../services/familyPlanRequestService';

const invitationReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SENT_REQUESTS:
      return action.data;
    case SEND_REQUEST:
      return state.concat(action.data);
    default:
      return state;
  }
};

export const setSentRequests = (userId) => {
  return async (dispatch) => {
    const data = await familyPlanRequestService.getAllSentRequests(userId);
    dispatch({ type: SET_SENT_REQUESTS, data });
  };
};

export const sendRequest = (params) => {
  return async (dispatch) => {
    const data = await familyPlanRequestService.sendRequest(params);
    dispatch({ type: SEND_REQUEST, data });
  };
};

const SET_SENT_REQUESTS = 'SET_SENT_REQUESTS';
const SEND_REQUEST = 'SEND_REQUEST';

export default invitationReducer;
