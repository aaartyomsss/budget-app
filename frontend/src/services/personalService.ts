import axios, { AxiosError } from 'axios'
import { CreateExpense, Expense } from '../types/expense'

const getAll = async () => {
  const res = await axios.get<Expense[]>('personal-plan/')
  return res
}

const addExpense = async (toAdd: CreateExpense) => {
  try {
    const res = await axios.post<Expense>('personal-plan', toAdd)
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

const removeExpense = async (id) => {
  const res = await axios.delete(`personal-plan/${id}`)
  return res.data
}

const modifyExpense = async (id, newExpense) => {
  const res = await axios.patch(`personal-plan/${id}`, newExpense)

  return res
}

export default { getAll, addExpense, removeExpense, modifyExpense }
