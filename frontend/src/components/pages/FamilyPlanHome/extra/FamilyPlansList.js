import React from 'react';
import { Table } from 'antd';

const COLUMNS = [
  {
    title: 'Plan Name',
    dataIndex: 'planName',
    key: 'planName',
  },
  {
    title: 'Total Users',
    dataIndex: 'totalUsers',
    key: 'totalUsers',
  },
  {
    title: 'Total Expenses',
    dataIndex: 'totalExpenses',
    key: 'totalExpenses',
  },
];

const FamilyPlansList = ({ familyPlans }) => {
  let data = [];
  familyPlans.forEach((plan) => {
    data.push({
      planName: plan.planName,
      totalUsers: plan.users.length,
      totalExpenses: plan.expenses.length,
    });
  });

  return <Table columns={COLUMNS} dataSource={data} />;
};

export default FamilyPlansList;
