import axios from 'axios'

const getSentRequests = async (userId) => {
  const { data } = await axios.get(
    `family-plan-request/sent-requests/${userId}`
  )
  return data
}

const sendRequest = async (params) => {
  const { data } = await axios.post(`family-plan-request/send-request`, params)
  return data
}

const getReceivedRequests = async (userId) => {
  const { data } = await axios.get(
    `family-plan-request/avaiting-response/${userId}`
  )
  return data
}

const answerRequest = async (answer, userId, requestId) => {
  const params = { answer, userId }
  const { data } = await axios.patch(
    `family-plan-request/request-response/${requestId}`,
    params
  )
  return data
}

export default {
  getSentRequests,
  sendRequest,
  getReceivedRequests,
  answerRequest,
}
