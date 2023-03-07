// Following function filters spending for graph overview per ea month
export const filterPerMonth = (data, year) => {
  const filtered = data.filter(e => parseInt(e.date.split(/\/|-/)[2]) === parseInt(year))
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
  filtered.forEach(expense => {
    switch (expense.date.split(/\/|-/)[1]) {
      case '01':
        result[0].value += expense.amountSpent
        break
      case '02':
        result[1].value += expense.amountSpent
        break
      case '03':
        result[2].value += expense.amountSpent
        break
      case '04':
        result[3].value += expense.amountSpent
        break
      case '05':
        result[4].value += expense.amountSpent
        break
      case '06':
        result[5].value += expense.amountSpent
        break
      case '07':
        result[6].value += expense.amountSpent
        break
      case '08':
        result[7].value += expense.amountSpent
        break
      case '09':
        result[8].value += expense.amountSpent
        break
      case '10':
        result[9].value += expense.amountSpent
        break
      case '11':
        result[10].value += expense.amountSpent
        break
      case '12':
        result[11].value += expense.amountSpent
        break
      default:
        break
    }
  })
  return result
}

export const highestSpentMonth = expenses => {
  let spentMostIn = 0
  let maxAmountSpent = 0
  expenses.forEach(obj => {
    if (obj.value > spentMostIn) {
      spentMostIn = obj.month
      maxAmountSpent = obj.value
    }
  })
  return { spentMostIn, maxAmountSpent }
}

export const filterPerCategory = (expenses, categories) => {
  let data = []

  categories.forEach(category => {
    data = [...data, {
      'category': category,
      'spent': 0
    }]
  })

  data.forEach(obj => {
    expenses.forEach(exp => {
      if (obj['category'] === exp.type) {
        obj['spent'] += exp.amountSpent
      }
    })
  })

  return data
}

export const spentMostPerMonth = expensesPerCategory => {
  let maxSpent = 0
  let maxSpentCategory = 0
  expensesPerCategory.forEach(obj => {
    if (obj.spent > maxSpent) {
      maxSpent = obj.spent
      maxSpentCategory = obj.category
    }
  })
  return { maxSpent, maxSpentCategory }
}

export const spentLeastPerMonth = expensesPerCategory => {
  let leastSpent = Infinity
  let leastSpentCategory = ''
  expensesPerCategory.forEach(obj => {
    if (obj.spent < leastSpent) {
      leastSpent = obj.spent
      leastSpentCategory = obj.category
    }
  })
  return { leastSpent, leastSpentCategory }
}

export const getAllCategories = expensesList => {
  const categories = expensesList.map(exp => exp.type)
  return [...new Set(categories)]
}

export const getExpensesPerYearAndMonth = (expensesList, year, month) => {
  const expensesPerYear = expensesList.filter(obj => parseInt(obj.date.split('/')[2]) === parseInt(year))
  return expensesPerYear.filter(obj => parseInt(obj.date.split('/')[1]) === parseInt(month))
}