import axios from 'axios'
import { Expense } from '../types/expense'

let token: string | null = null

const setToken = (t: string | null) => {
  token = t
}

const getAll = async () => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const res = await axios.get<Expense[]>('personal-plan/', config)
  return res.data
}

const addExpense = async (toAdd) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const res = await axios.post('personal-plan', toAdd, config)
  return res.data
}

const removeExpense = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const res = await axios.delete(`personal-plan/${id}`, config)
  return res.data
}

const modifyExpense = async (id, newExpense) => {
  const res = await axios.patch(`personal-plan/${id}`, newExpense)

  return res.data
}

export default { getAll, addExpense, setToken, removeExpense, modifyExpense }
