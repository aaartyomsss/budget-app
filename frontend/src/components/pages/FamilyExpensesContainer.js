import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dateFormatter } from '../../functions/helperFunctions';
import ExpensesList from './ExpensesList';

const FamilyExpensesContainer = () => {
  const { familyPlanId } = useParams();
  const familyPlanExpenses = useSelector(({ familyPlanReducer }) => {
    const plan = familyPlanReducer.filter((plan) => plan.id === familyPlanId);
    return plan[0].expenses;
  });
  familyPlanExpenses.forEach((obj) => {
    // RegEx that will ignore already formatted dates
    const reqPattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/;
    if (!reqPattern.test(obj.date)) {
      obj.date = dateFormatter(obj.date);
    }
    return (obj.key = obj.id);
  });
  return <ExpensesList expenses={familyPlanExpenses} />;
};

export default FamilyExpensesContainer;
