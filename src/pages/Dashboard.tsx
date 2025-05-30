import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { 
  BarChart2, 
  Bell, 
  ChevronDown,
  Lock,
  MessageSquare,
  Award,
  Settings
} from 'lucide-react';

import { User as AuthUser } from '../types/auth';

type TabType = 'progress' | 'controls' | 'chat' | 'notifications';

interface ProgressItem {
  id: string;
  label: string;
  percentage: number;
  color: string;
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext() as { user: AuthUser | null; isAuthenticated: boolean };
  const [activeTab, setActiveTab] = useState<TabType>('progress');

  // Progress data
  const progressItems: ProgressItem[] = [
    { id: 'math', label: 'Math Skills', percentage: 65, color: 'bg-primary-600' },
    { id: 'focus', label: 'Focus Time', percentage: 42, color: 'bg-secondary-600' },
    { id: 'emotion', label: 'Emotional Regulation', percentage: 78, color: 'bg-emerald-500' },
  ];

  // Achievements data
  const achievements: AchievementItem[] = [
    {
      id: 'math-whiz',
      title: 'Math Whiz',
      description: 'Completed 10 math exercises',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-100',
      iconColor: 'text-primary-600',
    },
    {
      id: 'focus-master',
      title: 'Focus Master',
      description: 'Focused for 30 minutes',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-100',
      iconColor: 'text-secondary-600',
    },
    {
      id: 'calm-keeper',
      title: 'Calm Keeper',
      description: 'Used calming techniques 5 times',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ];

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the dashboard content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'progress':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl border border-neutral-100 p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">Progress Overview</h2>
              <div className="space-y-4">
                {progressItems.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                      <span className="text-sm text-neutral-500">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Achievements */}
            <div className="bg-white rounded-xl border border-neutral-100 p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center p-3 ${achievement.bgColor} rounded-lg border ${achievement.borderColor}`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${achievement.bgColor.replace('50', '100')}`}>
                      <Award className={achievement.iconColor} size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-800">{achievement.title}</h3>
                      <p className="text-xs text-neutral-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'controls':
        return (
          <div className="bg-white rounded-xl border border-neutral-100 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Parental Controls</h2>
            <p className="text-neutral-600">Manage your child's account settings and restrictions here.</p>
          </div>
        );
      
      case 'chat':
        return (
          <div className="bg-white rounded-xl border border-neutral-100 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Therapist Chat</h2>
            <p className="text-neutral-600">Connect with your therapist for support and guidance.</p>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="bg-white rounded-xl border border-neutral-100 p-6">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Notifications</h2>
            <p className="text-neutral-600">You have no new notifications.</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-neutral-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                  {(user?.user_metadata?.name || user?.email || 'User')[0]?.toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold text-neutral-800">
                    {user?.user_metadata?.name || user?.email || 'User'}
                  </h2>
                  <p className="text-sm text-neutral-500">Student</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'progress', icon: <BarChart2 size={20} />, label: 'Progress' },
                  { id: 'controls', icon: <Lock size={20} />, label: 'Parental Controls' },
                  { id: 'chat', icon: <MessageSquare size={20} />, label: 'Therapist Chat' },
                  { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center p-3 rounded-lg text-left ${
                      activeTab === item.id 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-1">
                  <Link 
                    to="/settings"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Link>
                  <Link 
                    to="/games" 
                    className="flex items-center justify-between p-3 rounded-lg text-neutral-700 hover:bg-neutral-50"
                  >
                    <span>Educational Games</span>
                    <ChevronDown size={16} className="text-neutral-400" />
                  </Link>
                  <Link 
                    to="/therapy" 
                    className="flex items-center justify-between p-3 rounded-lg text-neutral-700 hover:bg-neutral-50"
                  >
                    <span>Therapy Sessions</span>
                    <ChevronDown size={16} className="text-neutral-400" />
                  </Link>
                  <Link 
                    to="/resources" 
                    className="flex items-center justify-between p-3 rounded-lg text-neutral-700 hover:bg-neutral-50"
                  >
                    <span>Resource Library</span>
                    <ChevronDown size={16} className="text-neutral-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-neutral-100 p-6 mb-6">
              <h1 className="text-2xl font-bold text-neutral-800 mb-2">
                Welcome back, {user?.user_metadata?.name?.split(' ')[0] || 'there'}!
              </h1>
              <p className="text-neutral-600">Here's what's happening with your learning journey today.</p>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
