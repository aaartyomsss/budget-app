import { Select } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMonths, getAllYears } from '../../../functions/overviewDropdown'
import { Store } from '../../../store'
import './OverviewDropdown.css'

const OverviewDropdown = ({ type, setYear, year, month, setMonth }) => {
  const { Option } = Select
  const personalExpenses = useSelector((state: Store) => state.personalExpenses)

  const years = getAllYears(personalExpenses)
  const months = getAllMonths(personalExpenses)

  if (type === 'year') {
    return (
      <div className='overview-select-yearly'>
        <Select
          style={{ width: '99%' }}
          onChange={(value) => setYear(value)}
          value={year}
        >
          {years.map((year: string) => {
            return (
              <Option key={year} value={year}>
                {year}
              </Option>
            )
          })}
        </Select>
      </div>
    )
  } else {
    return (
      <div className='overview-select-monthly'>
        <Select
          style={{ width: '49%' }}
          onChange={(value) => setYear(value)}
          value={year}
        >
          {years.map((year) => {
            return (
              <Option key={year} value={year}>
                {year}
              </Option>
            )
          })}
        </Select>
        <Select
          style={{ width: '49%' }}
          onChange={(value) => setMonth(value)}
          value={month}
        >
          {months.map((month) => {
            return (
              <Option key={month} value={month}>
                {month}
              </Option>
            )
          })}
        </Select>
      </div>
    )
  }
}

export default OverviewDropdown
