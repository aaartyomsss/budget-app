import React from 'react'
import { useSelector } from 'react-redux'
import {
  getAllCategories,
  filterPerCategory,
  spentMostPerMonth,
  spentLeastPerMonth,
  getExpensesPerYearAndMonth,
} from '../../functions/overviewFormatters'
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts'
import { Row, Col } from 'antd'
import './OverviewPerMonth.css'
import { Store } from '../../store'

const OverviewPerMonth = ({ selectedYear, selectedMonth }) => {
  const personalExpenses = useSelector((state: Store) => state.personalExpenses)
  const formattedExpenses = getExpensesPerYearAndMonth(
    personalExpenses,
    selectedYear,
    selectedMonth
  )
  const categories = getAllCategories(formattedExpenses)
  const data = filterPerCategory(formattedExpenses, categories)
  const { maxSpent, maxSpentCategory } = spentMostPerMonth(data)
  const { leastSpent, leastSpentCategory } = spentLeastPerMonth(data)

  if (formattedExpenses.length === 0) {
    return (
      <div className="nothing-to-display">
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
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderLegend = (props) => {
    const { payload } = props
    return (
      <ul className="piechart-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.payload.category}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Row>
      <Col span={16}>
        <ResponsiveContainer height={750} width="100%" className="cont">
          <PieChart width={750} height={400}>
            <Legend height={50} content={renderLegend} />
            <Pie
              data={data}
              dataKey="spent"
              nameKey="name"
              fill="#0f52ba"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, i) => (
                <Cell key={`cell${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col span={8}>
        <div className="centering-div">
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
      </Col>
    </Row>
  )
}

export default OverviewPerMonth
