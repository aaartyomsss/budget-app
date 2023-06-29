import axios, { AxiosError } from 'axios'
import { FamilyPlan } from '../types/expense'
import { Invitation } from '../types/invitation'

const getSentRequests = async (userId) => {
  const { data } = await axios.get(
    `family-plan-request/sent-requests/${userId}`
  )
  return data
}

const sendRequest = async (params) => {
  try {
    const res = await axios.post<Invitation>(
      `family-plan-request/send-request`,
      params
    )
    return { data: res.data, ok: true }
  } catch (error) {
    const _e = error as AxiosError
    const msg = _e.response?.data.error
    return { data: msg, ok: false }
  }
}

const getReceivedRequests = async (userId) => {
  const { data } = await axios.get(
    `family-plan-request/avaiting-response/${userId}`
  )
  return data
}

const answerRequest = async (answer, userId, requestId) => {
  const params = { answer, userId }
  const { data } = await axios.patch<FamilyPlan | null>(
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
