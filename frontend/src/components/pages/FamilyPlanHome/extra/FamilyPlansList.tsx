import React from 'react'
import FamilyPlanCard from './FamilyPlanCard'
import '../assets/FamilyPlansList.css'
import { FamilyPlan } from '../../../../types/expense'

type Props = {
  familyPlans: FamilyPlan[]
}

export type SimpleFamilyPlan = {
  id: string
  planName: string
  totalUsers: number
  totalExpenses: number
}

const FamilyPlansList = ({ familyPlans }: Props) => {
  let data: SimpleFamilyPlan[] = []
  familyPlans.forEach((plan) => {
    data.push({
      id: plan.id,
      planName: plan.planName,
      totalUsers: plan.users.length,
      totalExpenses: plan.expenses.length,
    })
  })

  // TODO: Header and designs
  return (
    <div className="container">
      <div>
        <span>Name</span>
        <span>Users</span>
        <span>Expenses</span>
      </div>
      {data.map((plan) => (
        <FamilyPlanCard
          key={plan.id}
          id={plan.id}
          totalUsers={plan.totalUsers}
          planName={plan.planName}
          totalExpenses={plan.totalExpenses}
        />
      ))}
    </div>
  )
}

export default FamilyPlansList
