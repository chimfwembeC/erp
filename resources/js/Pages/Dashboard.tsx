import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import Attendance from '@/Components/Attendance';


export default function Dashboard() {
  return (
    <AppLayout
      title="Dashboard"     
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <Attendance />
          </div>
          
        </div>
        

      </div>
    </AppLayout>
  );
}
