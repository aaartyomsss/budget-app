import { Expense } from '../types/expense'
import { getYear, getMonth } from './dateFromatters'

export const getAllYears = (expensesList: Expense[]): string[] => {
  const fullDates = expensesList.map((expenseLog) => expenseLog.date)
  const years = fullDates.map((date) => getYear(date))
  return [...new Set(years)]
}

export const getAllMonths = (expensesList: Expense[]) => {
  const fullDates = expensesList.map((exp) => exp.date)
  const months = fullDates.map((date) => getMonth(date))
  return [...new Set(months)]
}
