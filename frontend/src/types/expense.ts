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

export interface FamilyPlan {
  id: string
  created_by: string
  created_at: string
  expenses: Expense[]
  planName: string
  users: string[]
}
