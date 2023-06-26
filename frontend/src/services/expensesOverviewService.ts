import axios from 'axios'
import { Expense } from '../types/expense'

/**
 * @returns All of the expenses, i.e. personal + family plans
 */
const getAllTotalPersonalExpenses = async () => {
  const res = await axios.get<Expense[]>('/overview/personal-expenses')
  return res
}

/**
 *
 * @returns return all the expenses made by the user in family plans
 */
const getAllFamilyExpenses = async () => {
  const res = await axios.get<Expense[]>('/overview/family-plans')
  return res
}

export default {
  getAllTotalPersonalExpenses,
  getAllFamilyExpenses,
}
