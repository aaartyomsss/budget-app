import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/family-plan-request'

const getSentRequests = async (userId) => {
  const { data } = await axios.get(`${baseUrl}/sent-requests/${userId}`)
  return data
}

const sendRequest = async (params) => {
  const { data } = await axios.post(`${baseUrl}/send-request`, params)
  return data
}

const getReceivedRequests = async (userId) => {
  const { data } = await axios.get(`${baseUrl}/avaiting-response/${userId}`)
  return data
}

const answerRequest = async (answer, userId, requestId) => {
  const params = { answer, userId }
  const { data } = await axios.patch(
    `${baseUrl}/request-response/${requestId}`,
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
