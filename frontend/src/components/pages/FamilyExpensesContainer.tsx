import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExpensesList from './ExpensesList'
import familyPlanService from '../../services/familyPlanService'
import { FamilyPlan } from '../../types/expense'
import { Button } from 'antd'
import SpendingForm from '../shared/SpendingForm'

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

  // const familyPlanExpenses = useSelector((state: Store) => {
  //   const plan = state.familyPlanReducer.filter(
  //     (plan) => plan.id === familyPlanId
  //   )
  //   return plan[0].expenses
  // })
  // familyPlanExpenses.forEach((obj) => {
  //   // RegEx that will ignore already formatted dates
  //   const reqPattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/
  //   if (!reqPattern.test(obj.date)) {
  //     obj.date = dateFormatter(obj.date)
  //   }
  //   return Object.assign({ key: obj.id }, obj)
  // })
  return (
    <>
      <Button
        className="add-expense-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </Button>
      <ExpensesList expenses={familyPlan?.expenses || []} />
      <SpendingForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        familyPlanId={familyPlan?.id}
      />
    </>
  )
}

export default FamilyExpensesContainer
