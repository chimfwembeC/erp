import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import SectionTitle from '@/Components/SectionTitle';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/react';


const ShowAttendance = ({ attendance }) => {
  const route = useRoute();


  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'HRM', href: '/hrm' },
    { label: 'Attendances', href: '/hrm/attendances' },
    { label: 'Show' },
  ];



  const handleBack = () => {
    router.get(route('hrm.attendances.index'));
  };

  return (
    <AppLayout title="Attendance Details">
      <Breadcrumb items={breadcrumbItems} />
      <SectionTitle title="Attendance Details" description="View the details of this attendance record." />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <Card title="Attendance Information" className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="field">
              <h5>Employee Name</h5>
              <p>{attendance.user?.name || 'Not available'}</p>
            </div>
            <div className="field">
              <h5>Check In</h5>
              <p>{new Date(attendance.check_in).toLocaleString()}</p>
            </div>
            <div className="field">
              <h5>Check Out</h5>
              <p>{attendance.check_out ? new Date(attendance.check_out).toLocaleString() : 'Not available'}</p>
            </div>
            <div className="field">
              <h5>Status</h5>
              <Tag value={attendance.status} className={`p-tag-${attendance.status === 'checked_in' ? 'success' : 'info'}`} />
            </div>
          </div>
          <Button label="Back to Attendance List" icon="pi pi-arrow-left" className="p-button-secondary mt-4" onClick={handleBack} />
        </Card>
      </div>
    </AppLayout>
  );
};

export default ShowAttendance;
