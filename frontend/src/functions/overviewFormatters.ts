import { DateTime } from 'luxon'
import { Expense } from '../types/expense'

// Following function filters spending for graph overview per ea month
export const filterPerMonth = (data: Expense[], year) => {
  const filtered = data.filter((obj) => {
    const dt = DateTime.fromISO(obj.date as string)
    return dt.year === parseInt(year)
  })
  const result = [
    {
      month: 'Jan',
      value: 0,
    },
    {
      month: 'Feb',
      value: 0,
    },
    {
      month: 'Mar',
      value: 0,
    },
    {
      month: 'Apr',
      value: 0,
    },
    {
      month: 'May',
      value: 0,
    },
    {
      month: 'Jun',
      value: 0,
    },
    {
      month: 'Jul',
      value: 0,
    },
    {
      month: 'Aug',
      value: 0,
    },
    {
      month: 'Sep',
      value: 0,
    },
    {
      month: 'Oct',
      value: 0,
    },
    {
      month: 'Nov',
      value: 0,
    },
    {
      month: 'Dec',
      value: 0,
    },
  ]
  filtered.forEach((expense) => {
    const month = DateTime.fromISO(expense.date as string).month
    result[month].value += expense.amountSpent
  })
  return result
}

export const highestSpentMonth = (expenses) => {
  let spentMostIn = 0
  let maxAmountSpent = 0
  expenses.forEach((obj) => {
    if (obj.value > spentMostIn) {
      spentMostIn = obj.month
      maxAmountSpent = obj.value
    }
  })
  return { spentMostIn, maxAmountSpent }
}

export interface FilteredPerCategory {
  category: string
  spent: number
}

export const filterPerCategory = (expenses, categories) => {
  let data: FilteredPerCategory[] = []

  categories.forEach((category) => {
    data = [
      ...data,
      {
        category: category,
        spent: 0,
      },
    ]
  })

  data.forEach((obj) => {
    expenses.forEach((exp) => {
      if (obj['category'] === exp.type) {
        obj['spent'] += exp.amountSpent
      }
    })
  })

  return data
}

export const spentMostPerMonth = (expensesPerCategory) => {
  let maxSpent = 0
  let maxSpentCategory = 0
  expensesPerCategory.forEach((obj) => {
    if (obj.spent > maxSpent) {
      maxSpent = obj.spent
      maxSpentCategory = obj.category
    }
  })
  return { maxSpent, maxSpentCategory }
}

export const spentLeastPerMonth = (expensesPerCategory) => {
  let leastSpent = Infinity
  let leastSpentCategory = ''
  expensesPerCategory.forEach((obj) => {
    if (obj.spent < leastSpent) {
      leastSpent = obj.spent
      leastSpentCategory = obj.category
    }
  })
  return { leastSpent, leastSpentCategory }
}

export const getAllCategories = (expensesList) => {
  const categories = expensesList.map((exp) => exp.type)
  return [...new Set(categories)]
}

export const getExpensesPerYearAndMonth = (
  expensesList: Expense[],
  year,
  month
) => {
  const expensesPerYear = expensesList.filter((obj) => {
    const dt = DateTime.fromISO(obj.date as string)
    return dt.year === parseInt(year)
  })
  return expensesPerYear.filter((obj) => {
    const dt = DateTime.fromISO(obj.date as string)
    return dt.month === parseInt(month)
  })
}
