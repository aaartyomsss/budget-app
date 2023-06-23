import { Layout, Space, Table } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { dateFormatter, toTime } from '../../functions/helperFunctions'
import { removeExpense } from '../../reducers/personalReducer'
import familyPlanService from '../../services/familyPlanService'
import '../../styles.css'
import { SetState } from '../../types/common'
import { Expense, FamilyPlan } from '../../types/expense'
import ModifyButton from '../shared/ModifyButton'
import RemoveButton from '../shared/RemoveButton'
// Component that displays list of personal/ family expenses

type Props = {
  expenses: (Expense & { key: any })[]
  familyPlanId?: string
  setFamilyPlan?: SetState<FamilyPlan | undefined>
}

const ExpensesList = ({ expenses, familyPlanId, setFamilyPlan }: Props) => {
  const dispatch = useDispatch()
  const { Column, ColumnGroup } = Table
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

  return (
    <div>
      <Layout style={{ height: '100%' }}>
        <Content>
          <Table dataSource={expenses}>
            <ColumnGroup>
              <Column title='Title' dataIndex='title' key='title' />
              <Column
                title='Spent'
                dataIndex='amountSpent'
                key='amountSpent'
                sorter={(a: Expense, b: Expense) =>
                  a.amountSpent - b.amountSpent
                }
              />
              <Column title='Category' dataIndex='type' key='type' />
              <Column
                title='Date'
                dataIndex='date'
                key='date'
                defaultSortOrder='descend'
                sorter={(a: Expense, b: Expense) =>
                  toTime(a.date).getTime() - toTime(b.date).getTime()
                }
                render={(dateString) => dateFormatter(dateString)}
              />
              <Column
                title='Actions'
                key='actions'
                render={(_text, record: Expense) => (
                  <Space size='middle'>
                    <RemoveButton onClick={() => onRemove(record)} />
                    <ModifyButton expense={record} />
                  </Space>
                )}
              />
            </ColumnGroup>
          </Table>
        </Content>
      </Layout>
      <Footer className='footer'>
        Created by Artjom Savin, University of Helsinki
      </Footer>
    </div>
  )
}

export default ExpensesList
