import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PlanSection from './PlanSection';
import PreviewSection from './PreviewSection';
import { sections } from './planSections';
import { fields } from './planFields';
import { BusinessIdea, BusinessPlan } from '../../types';
import { storeBusinessPlan } from '../../utils/storage';
import { FileText, ChevronDown } from 'lucide-react';

interface BusinessPlanFormProps {
  ideaData?: BusinessIdea;
  existingPlan?: BusinessPlan;
}

export default function BusinessPlanForm({ ideaData, existingPlan }: BusinessPlanFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { startAtPreview } = location.state || {};

  // Initialize form data with only specific fields if ideaData is present
  const initialFormData = existingPlan || (ideaData ? {
    coverPage: {
      businessName: ideaData.title || '',
      briefDescription: ideaData.description || '',
      howItWorks: ideaData.howItWorks || ''
    }
  } : {});
  
  const [currentSection, setCurrentSection] = useState(startAtPreview ? 'preview' : sections[0].id);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>(initialFormData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentSectionData = sections.find(s => s.id === currentSection) || sections[0];
  const currentSectionIndex = sections.findIndex(s => s.id === currentSection) + 1;
  const totalSections = sections.length;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (existingPlan) {
      if (existingPlan.userId === user?.id) {
        setFormData(existingPlan);
      } else {
        navigate('/dashboard/my-plans');
      }
    }
  }, [existingPlan, user, navigate]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSectionChange = (sectionId: string) => {
    if (hasUnsavedChanges) {
      savePlan();
    }
    setCurrentSection(sectionId);
    setCurrentFieldIndex(0);
    setIsDropdownOpen(false);
  };

  const handleFieldNavigation = (direction: 'next' | 'previous') => {
    const sectionFields = fields[currentSection] || [];
    const totalFields = sectionFields.length;
    const currentSectionIndex = sections.findIndex(s => s.id === currentSection);

    if (direction === 'next') {
      if (currentFieldIndex < totalFields - 1) {
        setCurrentFieldIndex(currentFieldIndex + 1);
      } else if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1];
        if (nextSection.id !== 'preview') {
          handleSectionChange(nextSection.id);
        }
      }
    } else if (direction === 'previous') {
      if (currentFieldIndex > 0) {
        setCurrentFieldIndex(currentFieldIndex - 1);
      } else if (currentSectionIndex > 0) {
        const previousSection = sections[currentSectionIndex - 1];
        const previousSectionFields = fields[previousSection.id] || [];
        handleSectionChange(previousSection.id);
        setCurrentFieldIndex(previousSectionFields.length - 1);
      }
    }
  };

  const savePlan = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!formData.coverPage?.businessName) {
      alert('Please enter a business name before saving.');
      return;
    }

    const timestamp = new Date().toISOString();
    const planToSave: BusinessPlan = {
      ...(existingPlan?.id ? { id: existingPlan.id } : { id: crypto.randomUUID() }),
      userId: user.id,
      created: existingPlan?.created || timestamp,
      lastModified: timestamp,
      ...formData
    };

    storeBusinessPlan(planToSave);
    setHasUnsavedChanges(false);
  };

  const handleSaveAndExit = () => {
    savePlan();
    navigate('/dashboard/my-plans');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Section Selection */}
      <div className="mb-6 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between bg-white px-4 py-2.5 text-base font-medium rounded-md shadow-sm hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2 text-indigo-600" />
            <span>{currentSectionIndex} of {totalSections} - {currentSectionData.title}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-[60vh] overflow-y-auto">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`
                  w-full flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                  ${currentSection === section.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}
                  ${index === 0 ? 'rounded-t-md' : ''}
                  ${index === sections.length - 1 ? 'rounded-b-md' : ''}
                `}
              >
                <span className="w-6 text-center">{index + 1}.</span>
                <FileText className={`w-4 h-4 mx-2 ${currentSection === section.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        {currentSection === 'preview' ? (
          <PreviewSection 
            formData={formData} 
            onSave={savePlan}
          />
        ) : (
          <PlanSection
            section={currentSectionData}
            sectionId={currentSectionData.id}
            formData={formData[currentSectionData.id] || {}}
            onChange={(fieldId, value) => handleFieldChange(currentSectionData.id, fieldId, value)}
            allFormData={formData}
            currentFieldIndex={currentFieldIndex}
            totalFields={fields[currentSection]?.length || 0}
            onNextField={() => handleFieldNavigation('next')}
            onPreviousField={() => handleFieldNavigation('previous')}
            onSectionChange={handleSectionChange}
            onSaveAndExit={handleSaveAndExit}
          />
        )}
      </div>
    </div>
  );
}