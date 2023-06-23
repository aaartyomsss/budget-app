import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import familyPlanService from '../../services/familyPlanService'
import { Expense, FamilyPlan } from '../../types/expense'
import SpendingForm from '../shared/SpendingForm'
import ExpensesList from './ExpensesList'

const FamilyExpensesContainer = () => {
  // TODO: Update the state
  const [familyPlan, setFamilyPlan] = useState<FamilyPlan>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const getAndSetPlan = async () => {
      const res = await familyPlanService.getPlan(id)
      setFamilyPlan(res.data)
    }
    getAndSetPlan()
  }, [])

  const onAddFamilyExpenses = (e: Expense) => {
    setFamilyPlan((plan) => {
      if (plan)
        return {
          ...plan,
          expenses: plan.expenses.concat(e),
        }
    })
  }

  const expensesWithKey = familyPlan?.expenses.map((e) => ({ ...e, key: e.id }))

  return (
    <>
      <Button
        className='add-expense-button'
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </Button>
      <ExpensesList
        expenses={expensesWithKey || []}
        familyPlanId={familyPlan?.id}
        setFamilyPlan={setFamilyPlan}
        setIsModalOpen={setIsModalOpen}
      />
      <SpendingForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        familyPlanId={familyPlan?.id}
        onAddFamilyExpenses={onAddFamilyExpenses}
      />
    </>
  )
}

export default FamilyExpensesContainer
