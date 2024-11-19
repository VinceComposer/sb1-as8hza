/**
 * Navigation component for business plan sections
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BusinessPlanSection } from '../../types/businessPlan';

interface PlanNavigationProps {
  sections: BusinessPlanSection[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function PlanNavigation({ sections, currentSection, onSectionChange }: PlanNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSectionData = sections.find(s => s.id === currentSection);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm md:text-base"
      >
        <span className="font-medium text-gray-900">{currentSectionData?.title || 'Select Section'}</span>
        <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-[60vh] md:max-h-96 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onSectionChange(section.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 transition-colors text-sm md:text-base ${
                currentSection === section.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}