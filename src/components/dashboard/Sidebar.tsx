import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  PlusCircle,
  LogOut,
  X 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'My Plans', path: '/dashboard/my-plans' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleNewPlan = () => {
    if (onClose) onClose();
    navigate('/dashboard/new-plan');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <FileText className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
          <span className="ml-2 text-lg md:text-xl font-semibold text-gray-900">PlanCraft</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <button 
          onClick={handleNewPlan}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Plan
        </button>
      </div>

      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 ${
              location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}