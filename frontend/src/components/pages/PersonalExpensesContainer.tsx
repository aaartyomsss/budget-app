import React from 'react'
import { dateFormatter } from '../../functions/helperFunctions'
import ExpensesList from './ExpensesList'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

const PersonalExpensesContainer = () => {
  const personalExpenses = useSelector((state: Store) => state.personalExpenses)

  const expenses = personalExpenses.map((obj) => {
    // RegEx that will ignore already formatted dates
    const reqPattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/

    if (!reqPattern.test(obj.date)) {
      obj.date = dateFormatter(obj.date)
    }

    const _obj = {
      key: obj.id,
      ...obj,
    }

    return _obj
  })

  return <ExpensesList expenses={expenses} />
}

export default PersonalExpensesContainer
