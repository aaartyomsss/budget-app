import { Row } from 'antd'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'
import {
  filterPerCategory,
  getAllCategories,
  getExpensesPerYearAndMonth,
  spentLeastPerMonth,
  spentMostPerMonth,
} from '../../../functions/overviewFormatters'
import { Expense } from '../../../types/expense'
import './OverviewPerMonth.css'

type Props = {
  selectedYear: number
  selectedMonth: string
  expenses: Expense[]
}

const OverviewPerMonth = ({ selectedYear, selectedMonth, expenses }: Props) => {
  const formattedExpenses = getExpensesPerYearAndMonth(
    expenses,
    selectedYear,
    selectedMonth
  )

  const categories = getAllCategories(formattedExpenses)
  const data = filterPerCategory(formattedExpenses, categories)
  const { maxSpent, maxSpentCategory } = spentMostPerMonth(data)
  const { leastSpent, leastSpentCategory } = spentLeastPerMonth(data)

  if (formattedExpenses.length === 0) {
    return (
      <div className='nothing-to-display'>
        <p>You have no expenses to display</p>
      </div>
    )
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderLegend = (props) => {
    const { payload } = props
    return (
      <ul className='piechart-legend'>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.payload.category}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Row className='overview-chart-container'>
      <div className='overview-chart-container-chart'>
        <ResponsiveContainer height={750} width='100%' className='cont'>
          <PieChart width={750} height={400}>
            <Legend height={50} content={renderLegend} />
            <Pie
              data={data}
              dataKey='spent'
              nameKey='name'
              fill='#0f52ba'
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, i) => (
                <Cell key={`cell${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='overview-chart-container-info'>
        <div className='centering-div'>
          <p>
            Most spent category: <b>{maxSpentCategory}</b>
          </p>
          <p>
            Total amount spent on that: <b>{maxSpent}</b>
          </p>
          <p>
            Least spent category: <b>{leastSpentCategory}</b>
          </p>
          <p>
            Total amount spent on that: <b>{leastSpent}</b>
          </p>
        </div>
      </div>
    </Row>
  )
}

export default OverviewPerMonth
