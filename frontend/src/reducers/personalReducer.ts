import personalService from '../services/personalService'
import { dateFormatter, capitalizeString } from '../functions/helperFunctions'
import { Expense } from '../types/expense'

const personalReducer = (state: Expense[] = [], action) => {
  switch (action.type) {
    case 'INIT': {
      let usersExpenses = action.user.personalPlan
      if (usersExpenses && usersExpenses.lenght) {
        usersExpenses.forEach((exp) => {
          exp.date = dateFormatter(exp.date)
          exp.type = capitalizeString(exp.type)
        })
      }
      return usersExpenses
    }
    case 'CLEAR':
      return action.data
    case 'ADD':
      return state.concat(action.data)
    case 'REMOVE': {
      const newState = state.filter((obj) => obj.id !== action.data)
      return newState
    }
    case 'MODIFIED': {
      const modifiedArr = state.map((obj) =>
        obj.id === action.data.id ? action.data : obj
      )
      return modifiedArr
    }
    default:
      return state
  }
}

export const initialPersonalPlan = () => {
  return async (dispatch) => {
    const expenses = await personalService.getAll()
    dispatch({
      type: 'ADD',
      data: expenses,
    })
  }
}

export const logoutClear = () => {
  return {
    type: 'CLEAR',
    data: [],
  }
}

export const addExpense = (expense: Expense) => {
  return {
    type: 'ADD',
    data: expense,
  }
}

export const removeExpense = (id) => {
  return async (dispatch) => {
    await personalService.removeExpense(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export const modifyExpense = (id, newExpense) => {
  return async (dispatch) => {
    const modified = await personalService.modifyExpense(id, newExpense)
    dispatch({
      type: 'MODIFIED',
      data: modified,
    })
  }
}

export default personalReducer
