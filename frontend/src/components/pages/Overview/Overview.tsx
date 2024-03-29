import React, { useEffect, useState } from 'react'
import { getAllMonths, getAllYears } from '../../../functions/overviewDropdown'
import expensesOverviewService from '../../../services/expensesOverviewService'
import personalService from '../../../services/personalService'
import { Expense } from '../../../types/expense'
import './Overview.css'
import OverviewDropdown from './OverviewDropdown'
import OverviewFilterNavbar from './OverviewFilterNavbar'
import OverviewPerMonth from './OverviewPerMonth'
import OverviewPerYear from './OverviewPerYear'
import OverviewType from './OverviewType'

export enum EOverviewType {
  ALL = 'all',
  PERSONAL = 'personal',
  FAMILY = 'family',
}

enum OverviewFilter {
  YEAR = 'year',
  MONTH = 'month',
}

const PROMISE_MAP = {
  [EOverviewType.ALL]: expensesOverviewService.getAllTotalPersonalExpenses,
  [EOverviewType.FAMILY]: expensesOverviewService.getAllFamilyExpenses,
  [EOverviewType.PERSONAL]: personalService.getAll,
}

// Following component represents component that will display
// Graph of spendings vs graph of incomes
// With specified filters
const Overview = () => {
  // Display month or year
  const [overviewType, setOverviewType] = useState<EOverviewType>(
    EOverviewType.ALL
  )
  const [filter, setFilter] = useState<OverviewFilter>(OverviewFilter.YEAR)
  const [selectedYear, setYear] = useState(new Date().getFullYear())
  const [selectedMonth, setMonth] = useState('01')
  const [expenses, setExpenses] = useState<Expense[]>([])

  const [yearsOptions, setYearsOptions] = useState<string[]>([])
  const [monthsOptions, setMonthsOptions] = useState<string[]>([])

  useEffect(() => {
    const getAndSetExpenses = async () => {
      const promise = PROMISE_MAP[overviewType]
      const res = await promise()
      const exps = res.data
      setExpenses(exps)

      const _years = getAllYears(exps)
      const _months = getAllMonths(exps)

      setYearsOptions(_years)
      setMonthsOptions(_months)

      if (_years.length) setYear(parseInt(_years[0]))
      if (_months.length) setMonth(_months[0])
    }
    getAndSetExpenses()
  }, [overviewType])

  return (
    <>
      <div className='outer-div'>
        <OverviewType
          selectedType={overviewType}
          setOverviewType={setOverviewType}
        />
        <OverviewFilterNavbar filter={filter} setFilter={setFilter} />
        <OverviewDropdown
          type={filter}
          setYear={setYear}
          year={selectedYear}
          month={selectedMonth}
          setMonth={setMonth}
          months={monthsOptions}
          years={yearsOptions}
        />

        {filter === OverviewFilter.YEAR ? (
          <OverviewPerYear selectedYear={selectedYear} expenses={expenses} />
        ) : (
          <OverviewPerMonth
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            expenses={expenses}
          />
        )}
      </div>
    </>
  )
}

export default Overview
