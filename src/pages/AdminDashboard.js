// Path: src/pages/AdminDashboard.js
import React, { useState } from 'react';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import ProfileManagement from '../components/admin/ProfileManagement';
import Analytics from '../components/admin/Analytics';
import UserManagement from '../components/admin/UserManagement';
import Settings from '../components/admin/Settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />;
      case 'profiles': return <ProfileManagement />;
      case 'analytics': return <Analytics />;
      case 'users': return <UserManagement />;
      case 'settings': return <Settings />;

      default: return <DashboardOverview />;
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar setActiveTab={setActiveTab} />
        <div className="p-4 flex-grow-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
