import React from 'react';
import FamilyPlanCard from './FamilyPlanCard';

const FamilyPlansList = ({ familyPlans }) => {
  let data = [];
  familyPlans.forEach((plan) => {
    data.push({
      id: plan.id,
      planName: plan.planName,
      totalUsers: plan.users.length,
      totalExpenses: plan.expenses.length,
    });
  });

  return (
    <div>
      {data.map((plan) => (
        <FamilyPlanCard
          key={plan.id}
          id={plan.id}
          totalUsers={plan.totalUsers}
          planName={plan.planName}
          totalExpenses={plan.totalExpenses}
        />
      ))}
    </div>
  );
};

export default FamilyPlansList;
