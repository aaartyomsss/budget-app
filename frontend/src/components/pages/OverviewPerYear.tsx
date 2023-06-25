import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  filterPerMonth,
  highestSpentMonth,
} from '../../functions/overviewFormatters'
import { Store } from '../../store'
import './Overview.css'

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
      <div className='nothing-to-display'>
        <p>You have no expenses to display</p>
      </div>
    )
  }

  return (
    <Row className='overview-chart-container'>
      <Col span={16}>
        <ResponsiveContainer height={750} width='100%'>
          <BarChart data={personalExpenses}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Bar dataKey='value' fill='#0f52ba' />
          </BarChart>
        </ResponsiveContainer>
      </Col>
      <Col span={8}>
        <div className='centering-div'>
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
