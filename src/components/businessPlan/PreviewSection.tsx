import React from 'react';
import { FileText } from 'lucide-react';
import { fields } from './planFields';
import { sections } from './planSections';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../../utils/pdfGenerator';

interface PreviewSectionProps {
  formData: { [key: string]: any };
  onSave?: () => void;
}

export default function PreviewSection({ formData, onSave }: PreviewSectionProps) {
  const navigate = useNavigate();

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    navigate('/dashboard/my-plans');
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(formData);
    } catch (error) {
      console.error('Error generating PDF document:', error);
    }
  };

  const renderSectionContent = (sectionId: string) => {
    const sectionFields = fields[sectionId] || [];
    const sectionData = formData[sectionId] || {};
    const hasContent = Object.values(sectionData).some(value => value);

    if (!hasContent) return null;

    return sectionFields.map(field => {
      const value = sectionData[field.id];
      if (!value) return null;

      return (
        <div key={field.id} className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{field.label}</h4>
          {field.type === 'file' ? (
            <div className="text-sm text-gray-600">
              {Array.isArray(value) ? (
                <ul className="list-disc list-inside">
                  {value.map((file: File, index: number) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              ) : (
                'No files attached'
              )}
            </div>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{value}</p>
          )}
        </div>
      );
    });
  };

  const contentSections = sections.filter(section => 
    section.id !== 'preview' && section.id !== 'tableOfContents'
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Cover Page */}
      <div className="p-8 border-b border-gray-200">
        <div className="text-right mb-8">
          <span className="text-gray-500">CONFIDENTIAL</span>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">BUSINESS PLAN</h1>
          <h2 className="text-3xl text-gray-800 mb-4">
            {formData.coverPage?.businessName || 'COMPANY NAME'}
          </h2>
          {formData.coverPage?.date && (
            <p className="text-gray-600">
              {new Date(formData.coverPage.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="max-w-lg mx-auto text-center">
          {formData.coverPage?.userName && (
            <p className="text-gray-700 mb-2">Prepared by: {formData.coverPage.userName}</p>
          )}
          {formData.coverPage?.email && (
            <p className="text-gray-700 mb-2">{formData.coverPage.email}</p>
          )}
          {formData.coverPage?.phone && (
            <p className="text-gray-700 mb-2">{formData.coverPage.phone}</p>
          )}
          {formData.coverPage?.address && (
            <p className="text-gray-700 mb-2">{formData.coverPage.address}</p>
          )}
          {formData.coverPage?.cityStateZip && (
            <p className="text-gray-700 mb-2">{formData.coverPage.cityStateZip}</p>
          )}
          {formData.coverPage?.website && (
            <p className="text-gray-700">{formData.coverPage.website}</p>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      <div className="p-8 border-b border-gray-200">
        <div className="text-right mb-8">
          <span className="text-gray-500">CONFIDENTIAL</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">TABLE OF CONTENTS</h2>
        <div className="space-y-3">
          {contentSections.map((section, index) => (
            <div key={section.id} className="flex items-center">
              <span className="text-gray-800">{`${index + 1}. ${section.title}`}</span>
              <div className="flex-1 mx-4 border-b border-dotted border-gray-300" />
              <span className="text-gray-600">{index + 3}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {contentSections.map((section, index) => {
        const sectionContent = renderSectionContent(section.id);
        const hasContent = sectionContent?.some(content => content !== null);

        return (
          <div key={section.id} className="p-8 border-b border-gray-200">
            <div className="text-right mb-8">
              <span className="text-gray-500">CONFIDENTIAL</span>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="bg-indigo-50 rounded-lg p-2 mr-3">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{`${index + 1}. ${section.title}`}</h2>
            </div>

            <div className="pl-4 border-l-2 border-gray-100">
              {hasContent ? sectionContent : (
                <p className="text-gray-500 italic">No content added for this section</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Action Buttons */}
      <div className="p-8 flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 shadow-sm"
        >
          Save
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}