import { Expense, FamilyPlan } from './expense'

export interface User {
  id: string
  name: string
  token: string
  personalPlan: Expense[]
  familyPlans: FamilyPlan[]
  username: string
}
