import axios from 'axios'
import { FamilyPlan } from '../types/expense'

const createPlan = async (planName, userId) => {
  const res = await axios.post(`family-plan/initialize-plan`, {
    planName,
    userId,
  })
  return res
}

const getUserPlans = async () => {
  const res = await axios.get<FamilyPlan[]>('family-plan/plans')
  return res
}

const getPlan = async (id: string) => {
  const res = await axios.get<FamilyPlan>(`family-plan/plans/${id}`)
  return res
}

const searchUser = async (query) => {
  const res = await axios.get(`users/search/${query}`)
  return res
}

export default { createPlan, searchUser, getUserPlans, getPlan }
