import React, { useState } from 'react'
import { dateFormatter } from '../../functions/helperFunctions'
import ExpensesList from './ExpensesList'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { Button } from 'antd'
import SpendingForm from '../shared/SpendingForm'

const PersonalExpensesContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add</Button>
      <ExpensesList expenses={expenses} />
      <SpendingForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default PersonalExpensesContainer
