import axios from 'axios'
import { FamilyPlan } from '../types/expense'
import { Expense, CreateExpense } from '../types/expense'
import { AxiosError } from 'axios'

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

const addExpensesToThePlan = async (id: string, payload: CreateExpense) => {
  try {
    const res = await axios.post<Expense>(`family-plan/plans/${id}`, payload)
    return { data: res.data, status: res.status }
  } catch (_error) {
    const error = _error as AxiosError
    if (error.response) {
      const res = error.response
      return { data: res.data, status: res.status }
    }
    return { data: 'Error occured', status: 500 }
  }
}

const searchUser = async (query) => {
  const res = await axios.get(`users/search/${query}`)
  return res
}

export default {
  createPlan,
  searchUser,
  getUserPlans,
  getPlan,
  addExpensesToThePlan,
}
