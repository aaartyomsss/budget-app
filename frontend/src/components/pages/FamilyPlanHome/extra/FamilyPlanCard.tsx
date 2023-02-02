import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/FamilyPlanCard.css';

type Props = {
  id: number;
  planName: string;
  totalUsers: number;
  totalExpenses: number;
};

const FamilyPlanCard = ({ id, planName, totalUsers, totalExpenses }: Props) => {
  return (
    <div className="plan-card-wrapper">
      <span>
        <Link to={`/family-plan/${id}`}>{planName}</Link>
      </span>
      <span>{totalUsers}</span>
      <span>{totalExpenses}</span>
    </div>
  );
};

export default FamilyPlanCard;
