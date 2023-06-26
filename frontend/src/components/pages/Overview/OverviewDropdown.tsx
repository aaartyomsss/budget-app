import { Select } from 'antd'
import React from 'react'
import './OverviewDropdown.css'

const OverviewDropdown = ({
  type,
  setYear,
  year,
  month,
  setMonth,
  years,
  months,
}) => {
  const { Option } = Select

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
