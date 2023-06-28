import { Button, Table } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { FamilyPlan } from '../../../../types/expense'
import '../assets/FamilyPlansList.css'

type Props = {
  familyPlans: FamilyPlan[]
}

export type SimpleFamilyPlan = {
  id: string
  planName: string
  totalUsers: number
  totalExpenses: number
  key: string
}

const FamilyPlansList = ({ familyPlans }: Props) => {
  const { Column, ColumnGroup } = Table
  const history = useHistory()

  const data: SimpleFamilyPlan[] = familyPlans.map((plan) => ({
    id: plan.id,
    planName: plan.planName,
    totalUsers: plan.users.length,
    totalExpenses: plan.expenses.length,
    key: plan.id,
  }))

  return (
    <div className='container'>
      <Table dataSource={data}>
        <ColumnGroup>
          <Column title='Plan name' dataIndex='planName' key='planName' />
          <Column title='Users' dataIndex='totalUsers' key='totalUsers' />
          <Column
            title='Expenses count'
            dataIndex='totalExpenses'
            key='totalExpenses'
          />
          <Column
            title='Actions'
            dataIndex='actions'
            key='actions'
            render={(_, obj: SimpleFamilyPlan) => (
              <Button onClick={() => history.push(`/family-plan/${obj.id}`)}>
                Open
              </Button>
            )}
          />
        </ColumnGroup>
      </Table>
    </div>
  )
}

export default FamilyPlansList
