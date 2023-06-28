import { User } from './user'

export interface Expense {
  id: string
  title: string
  date: string | null
  type: string
  amountSpent: number
  user: string
}

export interface CreateExpense {
  title: string
  date?: string
  type: string
  amountSpent: number
}

export interface FamilyPlanExpense extends Omit<Expense, 'user'> {
  user: User
}

export const isFamilyExpense = (
  e: Expense | FamilyPlanExpense
): e is FamilyPlanExpense => {
  if (typeof e.user === 'string') return false
  return true
}

export interface FamilyPlan {
  id: string
  created_by: string
  created_at: string
  expenses: FamilyPlanExpense[]
  planName: string
  users: string[]
}
