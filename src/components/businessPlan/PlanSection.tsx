import React, { useState } from 'react';
import { HelpCircle, Wand2, Loader2, X, RefreshCw } from 'lucide-react';
import { BusinessPlanSection, BusinessPlanField } from '../../types/businessPlan';
import { fields } from './planFields';
import { sections } from './planSections';
import PreviewSection from './PreviewSection';
import { generateFieldContent } from '../../services/contentGenerator';

interface PlanSectionProps {
  section: BusinessPlanSection;
  formData: { [key: string]: any };
  onChange: (fieldId: string, value: string | File[]) => void;
  sectionId: string;
  allFormData?: { [key: string]: any };
  currentFieldIndex: number;
  onNextField: () => void;
  onPreviousField: () => void;
  onSectionChange?: (sectionId: string) => void;
  onSaveAndExit: () => void;
}

const getTotalFieldCount = (): number => {
  return Object.values(fields).reduce((total, sectionFields) => total + sectionFields.length, 0);
};

const getCurrentFieldNumber = (sectionId: string, fieldIndex: number): number => {
  let count = 0;
  for (const section of sections) {
    if (section.id === sectionId) {
      return count + fieldIndex + 1;
    }
    count += fields[section.id]?.length || 0;
  }
  return count;
};

const fieldsWithoutAI = [
  'businessName',
  'sector',
  'userName',
  'email',
  'phone',
  'address',
  'website',
  'date',
  'additionalDocuments'
];

export default function PlanSection({
  section,
  formData = {},
  onChange,
  sectionId,
  allFormData = {},
  currentFieldIndex,
  onNextField,
  onPreviousField,
  onSectionChange,
  onSaveAndExit
}: PlanSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([]);
  const [showContentModal, setShowContentModal] = useState(false);
  
  const sectionFields = fields[sectionId] || [];
  const totalFieldCount = getTotalFieldCount();
  const currentFieldNumber = getCurrentFieldNumber(sectionId, currentFieldIndex);

  const currentField = sectionFields[currentFieldIndex];
  const currentFieldValue = formData[currentField?.id] || '';
  const buttonText = currentFieldValue ? 'Enhance content' : 'Create content';

  if (sectionId === 'preview') {
    return <PreviewSection formData={allFormData} />;
  }

  const handleGenerateContent = async () => {
    if (!currentField || fieldsWithoutAI.includes(currentField.id)) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const context = {
        businessName: allFormData?.coverPage?.businessName,
        userName: allFormData?.coverPage?.userName,
        date: allFormData?.coverPage?.date,
        email: allFormData?.coverPage?.email,
        phone: allFormData?.coverPage?.phone,
        address: allFormData?.coverPage?.address,
        website: allFormData?.coverPage?.website,
        sector: allFormData?.coverPage?.sector,
        existingContent: currentFieldValue
      };

      const result = await generateFieldContent(
        currentField.id,
        context,
        currentField.placeholder
      );

      if (!result.success || !result.content) {
        setGenerationError(result.error || 'Failed to generate content');
        return;
      }

      if (currentFieldValue) {
        // Enhancement mode - directly update the field
        onChange(currentField.id, result.content[0]);
      } else {
        // Creation mode - show options modal
        setGeneratedOptions(result.content);
        setShowContentModal(true);
      }
    } catch (error) {
      setGenerationError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseContent = (content: string) => {
    if (currentField) {
      onChange(currentField.id, content);
      setShowContentModal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-700 text-sm leading-relaxed">{section.description}</p>
          <div className="mt-4">
            <h3 className="font-medium text-blue-800 text-sm mb-2">Key Objectives:</h3>
            <ul className="list-disc list-inside space-y-1.5">
              {section.objectives.map((objective, index) => (
                <li key={index} className="text-blue-700 text-sm leading-relaxed">{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {sectionFields.length > 0 && (
        <>
          <div className="text-xs text-gray-500 mb-3">
            {currentFieldNumber} of {totalFieldCount}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <label htmlFor={currentField.id} className="block text-base font-medium text-gray-900">
                  {currentFieldNumber}. {currentField.label}
                </label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help hover:text-gray-600" />
                  <div className="invisible group-hover:visible absolute right-0 w-64 p-2.5 mt-1 text-xs text-gray-600 bg-white border rounded-md shadow-lg z-10">
                    {currentField.tooltip}
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 mb-2">The text should include:</div>

              {currentField.type === 'textarea' ? (
                <textarea
                  id={currentField.id}
                  value={currentFieldValue}
                  onChange={(e) => onChange(currentField.id, e.target.value)}
                  placeholder={currentField.placeholder || ''}
                  rows={4}
                  className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y min-h-[120px]"
                />
              ) : currentField.type === 'date' ? (
                <input
                  type="date"
                  id={currentField.id}
                  value={currentFieldValue}
                  onChange={(e) => onChange(currentField.id, e.target.value)}
                  className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : currentField.type === 'file' ? (
                <input
                  type="file"
                  id={currentField.id}
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    onChange(currentField.id, files);
                  }}
                  className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              ) : (
                <input
                  type="text"
                  id={currentField.id}
                  value={currentFieldValue}
                  onChange={(e) => onChange(currentField.id, e.target.value)}
                  placeholder={currentField.placeholder || ''}
                  className="w-full p-2.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              )}

              {generationError && (
                <div className="mt-2 text-sm text-red-600">
                  {generationError}
                </div>
              )}

              {!fieldsWithoutAI.includes(currentField?.id) && (
                <div className="mt-3">
                  <button
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                    className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3.5 h-3.5" />
                        {buttonText}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between mt-8 space-x-4">
        <button
          onClick={onPreviousField}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Previous
        </button>

        <button
          onClick={onSaveAndExit}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm"
        >
          Save & Exit
        </button>

        <button
          onClick={onNextField}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Next
        </button>
      </div>

      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Content Options</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateContent}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowContentModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {generatedOptions.map((option, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">Option {index + 1}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap">{option}</p>
                    <button
                      onClick={() => handleUseContent(option)}
                      className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Use this
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}