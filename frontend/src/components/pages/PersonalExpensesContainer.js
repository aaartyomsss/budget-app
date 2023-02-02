import React from 'react'
import { dateFormatter } from '../../functions/helperFunctions'
import ExpensesList from './ExpensesList'

const PersonalExpensesContainer = ({ expenses }) => {
  expenses.forEach((obj) => {
    // RegEx that will ignore already formatted dates
    const reqPattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/

    if (!reqPattern.test(obj.date)) {
      obj.date = dateFormatter(obj.date)
    }

    return (obj.key = obj.id)
  })
  return <ExpensesList expenses={expenses} />
}

export default PersonalExpensesContainer
