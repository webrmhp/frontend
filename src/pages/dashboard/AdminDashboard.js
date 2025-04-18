import React, { useEffect, useState } from 'react';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/Sidebar';
import AdminStates from './DashboardStates';
import User from './User';
import SerachPanel from './SerachPanel';
import SliderPanel from './slider';
import Course from './Course';
import CourseRequest from './courseRequest';
import ManageQuiz from './manageQuiz';
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <AdminStates />;
      case 'Users':
        return <User />;
      case 'Serach Panel':
        return <SerachPanel />;
      case 'Slider':
        return <SliderPanel />;
      case 'Course':
        return <Course />;
      case 'Request':
        return <CourseRequest />;
      case 'Quiz':
        return <ManageQuiz />;

      default:
        return <AdminStates />;
    }
  };
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <Sidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <Header />

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-scroll p-6'>{renderSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
