import React from 'react';
import { useLocation } from 'react-router-dom';
import BusinessPlanForm from '../../components/businessPlan/BusinessPlanForm';

export default function NewPlan() {
  const location = useLocation();
  const { ideaData, existingPlan } = location.state || {};

  return (
    <div className="max-w-7xl mx-auto">
      <BusinessPlanForm 
        ideaData={ideaData} 
        existingPlan={existingPlan} 
      />
    </div>
  );
}