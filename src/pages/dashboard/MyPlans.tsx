import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Trash2, Calendar, Edit3, AlertTriangle, Eye } from 'lucide-react';
import { BusinessPlan } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { getStoredBusinessPlans, deleteBusinessPlan } from '../../utils/storage';

export default function MyPlans() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plans, setPlans] = useState<BusinessPlan[]>([]);
  const [planToDelete, setPlanToDelete] = useState<BusinessPlan | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadPlans = () => {
    if (!user) return;
    const userPlans = getStoredBusinessPlans(user.id);
    // Sort plans by lastModified date in descending order (most recent first)
    const sortedPlans = userPlans.sort((a: BusinessPlan, b: BusinessPlan) => 
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
    setPlans(sortedPlans);
  };

  useEffect(() => {
    loadPlans();
  }, [user]);

  const handleCreateNewPlan = () => {
    navigate('/dashboard/new-plan');
  };

  const handleEditPlan = (plan: BusinessPlan) => {
    navigate('/dashboard/new-plan', { 
      state: { existingPlan: plan } 
    });
  };

  const handlePreviewPlan = (plan: BusinessPlan) => {
    navigate('/dashboard/new-plan', { 
      state: { existingPlan: plan, startAtPreview: true } 
    });
  };

  const handleDeleteClick = (plan: BusinessPlan) => {
    setPlanToDelete(plan);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (planToDelete && user) {
      deleteBusinessPlan(planToDelete.id, user.id);
      loadPlans(); // Reload plans after deletion
      setShowDeleteModal(false);
      setPlanToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPlanToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Business Plans</h1>
        <button
          onClick={handleCreateNewPlan}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No business plans yet</h3>
          <p className="text-gray-500">Create your first business plan to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {plan.coverPage?.businessName || 'Untitled Plan'}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last modified: {formatDate(plan.lastModified)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlePreviewPlan(plan)}
                      className="flex items-center px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(plan)}
                      className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Delete Business Plan</h3>
            </div>
            
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete "{planToDelete?.coverPage?.businessName}"? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}