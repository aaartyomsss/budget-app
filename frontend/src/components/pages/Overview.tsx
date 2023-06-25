import React, { useState } from 'react'
import './Overview.css'
import OverviewDropdown from './OverviewDropdown'
import OverviewFilterNavbar from './OverviewFilterNavbar'
import OverviewPerMonth from './OverviewPerMonth'
import OverviewPerYear from './OverviewPerYear'

// Following component represents component that will display
// Graph of spendings vs graph of incomes
// With specified filters
const Overview = () => {
  // Display month or year
  const [filter, setFilter] = useState('year')
  const [selectedYear, setYear] = useState(new Date().getFullYear())
  const [selectedMonth, setMonth] = useState('01')

  return (
    <>
      <div className='outer-div'>
        <OverviewFilterNavbar filter={filter} setFilter={setFilter} />
        <OverviewDropdown
          type={filter}
          setYear={setYear}
          year={selectedYear}
          month={selectedMonth}
          setMonth={setMonth}
        />

        {filter === 'year' ? (
          <OverviewPerYear selectedYear={selectedYear} />
        ) : (
          <OverviewPerMonth
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        )}
      </div>
    </>
  )
}

export default Overview
