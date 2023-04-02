import React from 'react'
import { useSelector } from 'react-redux'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import {
  filterPerMonth,
  highestSpentMonth,
} from '../../functions/overviewFormatters'
import './Overview.css'
import { Row, Col } from 'antd'
import { Store } from '../../store'

const OverviewPerYear = ({ selectedYear }) => {
  const expenses = useSelector((state: Store) => state.personalExpenses)
  // all the data
  const personalExpenses = filterPerMonth(expenses, selectedYear)
  const { spentMostIn, maxAmountSpent } = highestSpentMonth(personalExpenses)
  const spentThroughYear = personalExpenses.reduce(
    (sum, current) => sum + current.value,
    0
  )

  if (personalExpenses.length === 0) {
    return (
      <div className="nothing-to-display">
        <p>You have no expenses to display</p>
      </div>
    )
  }

  return (
    <Row>
      <Col span={16}>
        <ResponsiveContainer height={750} width="100%">
          <BarChart data={personalExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="value" fill="#0f52ba" />
          </BarChart>
        </ResponsiveContainer>
      </Col>
      <Col span={8}>
        <div className="centering-div">
          <p>
            You have spent the most in <b>{spentMostIn}</b>, which was{' '}
            <b>{maxAmountSpent}</b> in your currency
          </p>
          <p>
            The total amount that you have spent in <b>{selectedYear}</b> is{' '}
            <b>{spentThroughYear}</b>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default OverviewPerYear
