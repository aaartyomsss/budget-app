import { Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import SpendingForm from '../shared/SpendingForm'
import ExpensesList from './ExpensesList'

const PersonalExpensesContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const expenses = useSelector((state: Store) => {
    return state.personalExpenses.map((e) => ({ ...e, key: e.id }))
  })

  return (
    <>
      <Button
        className='add-expense-button'
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </Button>
      <ExpensesList expenses={expenses} setIsModalOpen={setIsModalOpen} />
      <SpendingForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default PersonalExpensesContainer
