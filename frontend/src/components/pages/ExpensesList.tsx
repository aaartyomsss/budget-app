import { Layout, Space, Table } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { dateFormatter, toTime } from '../../functions/helperFunctions'
import { removeExpense } from '../../reducers/personalReducer'
import familyPlanService from '../../services/familyPlanService'
import '../../styles.css'
import { SetState } from '../../types/common'
import {
  Expense,
  FamilyPlan,
  FamilyPlanExpense,
  isFamilyExpense,
} from '../../types/expense'
import ModifyButton from '../shared/ModifyButton'
import RemoveButton from '../shared/RemoveButton'
// Component that displays list of personal/ family expenses

type Props = {
  expenses: (Expense & { key: any })[] | (FamilyPlanExpense & { key: any })[]
  setIsModalOpen: SetState<boolean>
  familyPlanId?: string
  setFamilyPlan?: SetState<FamilyPlan | undefined>
}

const ExpensesList = (props: Props) => {
  const { expenses, familyPlanId, setFamilyPlan, setIsModalOpen } = props

  const dispatch = useDispatch()
  const { Content, Footer } = Layout

  const onRemove = async (expense: Expense) => {
    if (familyPlanId && setFamilyPlan) {
      // TODO: Fill the rest
      const res = await familyPlanService.removeExpenseFromThePlan(
        familyPlanId,
        expense.id
      )
      if (res.status === 204)
        setFamilyPlan((plan) => {
          if (plan)
            return {
              ...plan,
              expenses: plan?.expenses.filter((e) => e.id !== expense.id),
            }
        })
      return
    }
    dispatch(removeExpense(expense.id))
  }

  const renderTable = () => {
    if (!expenses.length) return <></>
    return isFamilyExpense(expenses[0]) ? (
      <FamilyExpenseTable
        expenses={expenses as (FamilyPlanExpense & { key: string })[]}
        onRemove={onRemove}
        setIsModalOpen={setIsModalOpen}
      />
    ) : (
      <PersonalExpensesTable
        expenses={expenses as (Expense & { key: string })[]}
        onRemove={onRemove}
        setIsModalOpen={setIsModalOpen}
      />
    )
  }

  return (
    <div>
      <Layout style={{ height: '100%' }}>
        <Content>{renderTable()}</Content>
      </Layout>
      <Footer className='footer'>
        Created by Artjom Savin, University of Helsinki
      </Footer>
    </div>
  )
}

type PersonalProps = {
  expenses: (Expense & { key: any })[]
  setIsModalOpen: SetState<boolean>
  onRemove: (expense: Expense) => Promise<void>
}

const PersonalExpensesTable = (props: PersonalProps) => {
  const { expenses, onRemove, setIsModalOpen } = props
  const { Column, ColumnGroup } = Table

  return (
    <Table dataSource={expenses} style={{ overflow: 'scroll' }}>
      <ColumnGroup>
        <Column title='Title' dataIndex='title' key='title' />
        <Column
          title='Spent'
          dataIndex='amountSpent'
          key='amountSpent'
          sorter={(a: Expense, b: Expense) => a.amountSpent - b.amountSpent}
        />
        <Column title='Category' dataIndex='type' key='type' />
        <Column
          title='Date'
          dataIndex='date'
          key='date'
          defaultSortOrder='descend'
          sorter={(a: Expense, b: Expense) => {
            if (!a.date || !b.date) return -1
            return toTime(a.date).getTime() - toTime(b.date).getTime()
          }}
          render={(dateString) => dateFormatter(dateString)}
        />
        <Column
          title='Actions'
          key='actions'
          render={(_text, record: Expense) => (
            <Space size='middle'>
              <RemoveButton onClick={() => onRemove(record)} />
              <ModifyButton
                expense={record}
                onClick={() => setIsModalOpen(true)}
              />
            </Space>
          )}
        />
      </ColumnGroup>
    </Table>
  )
}

interface FamilyTableProps extends Omit<PersonalProps, 'expenses'> {
  expenses: (FamilyPlanExpense & { key: any })[]
}

const FamilyExpenseTable = (props: FamilyTableProps) => {
  const { expenses, onRemove, setIsModalOpen } = props
  const { Column, ColumnGroup } = Table

  return (
    <Table dataSource={expenses} style={{ overflow: 'scroll' }}>
      <ColumnGroup>
        <Column title='Title' dataIndex='title' key='title' />
        <Column
          title='Spent'
          dataIndex='amountSpent'
          key='amountSpent'
          sorter={(a: Expense, b: Expense) => a.amountSpent - b.amountSpent}
        />
        <Column title='Category' dataIndex='type' key='type' />
        <Column
          title='User'
          dataIndex='user'
          key='user'
          render={(_, expense: FamilyPlanExpense) => expense.user.name}
        />
        <Column
          title='Date'
          dataIndex='date'
          key='date'
          defaultSortOrder='descend'
          sorter={(a: Expense, b: Expense) => {
            if (!a.date || !b.date) return -1
            return toTime(a.date).getTime() - toTime(b.date).getTime()
          }}
          render={(dateString) => dateFormatter(dateString)}
        />
        <Column
          title='Actions'
          key='actions'
          render={(_text, record: Expense) => (
            <Space size='middle'>
              <RemoveButton onClick={() => onRemove(record)} />
              <ModifyButton
                expense={record}
                onClick={() => setIsModalOpen(true)}
              />
            </Space>
          )}
        />
      </ColumnGroup>
    </Table>
  )
}

export default ExpensesList
