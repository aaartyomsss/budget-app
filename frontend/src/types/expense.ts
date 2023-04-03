export interface Expense {
  id: string
  title: string
  date: string
  type: string
  amountSpent: number
  user: string
}

export interface FamilyPlan {
  id: string
  created_by: string
  created_at: string
  expenses: Expense[]
  planName: string
  users: string[]
}
