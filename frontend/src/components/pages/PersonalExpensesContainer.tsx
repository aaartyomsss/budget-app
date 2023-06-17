import React, { useState } from 'react'
import ExpensesList from './ExpensesList'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { Button } from 'antd'
import SpendingForm from '../shared/SpendingForm'

const PersonalExpensesContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const expenses = useSelector((state: Store) => state.personalExpenses)

  return (
    <>
      <Button
        className="add-expense-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </Button>
      <ExpensesList expenses={expenses} />
      <SpendingForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default PersonalExpensesContainer
