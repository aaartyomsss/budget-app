import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dateFormatter } from '../../functions/helperFunctions'
import ExpensesList from './ExpensesList'
import { Store } from '../../store'
import familyPlanService from '../../services/familyPlanService'
import { FamilyPlan } from '../../types/expense'

const FamilyExpensesContainer = () => {
  const [familyPlan, setFamilyPlan] = useState<FamilyPlan>()
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
  return <ExpensesList expenses={[]} />
}

export default FamilyExpensesContainer
