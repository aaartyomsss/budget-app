import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/FamilyPlanCard.css'

const FamilyPlanCard = ({ id, planName, totalUsers, totalExpenses }) => {
  return (
    <div className="plan-card-wrapper">
      <span>
        <Link to={`/family-plan/${id}`}>{planName}</Link>
      </span>
      <span>{totalUsers}</span>
      <span>{totalExpenses}</span>
    </div>
  )
}

export default FamilyPlanCard
