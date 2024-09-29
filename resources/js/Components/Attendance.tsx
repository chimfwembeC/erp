import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
  import { Toast } from 'primereact/toast'; // PrimeReact Toast
  import Swal from 'sweetalert2'; // SweetAlert2
  import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
  import 'primereact/resources/primereact.min.css'; // PrimeReact core css
  import 'primeicons/primeicons.css'; // PrimeIcons
  import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2 CSS
import moment from 'moment';

const Attendance = () => {
  const { auth } = usePage().props; // Get authenticated user
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const toast = useRef(null); // Toast reference for PrimeReact

  // Load attendance records and check if already checked in today
  useEffect(() => {
    axios.get('/attendance')
      .then(response => {
        setAttendanceRecords(response.data);
        // Check if today's check-in exists
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        const todayCheckIn = response.data.some(record => 
          record.check_in && record.check_in.startsWith(today)
        );
        if (todayCheckIn) {
          setAlreadyCheckedIn(true); // Disable check-in if already done today
        }
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  // Function to handle Check-In
  const handleCheckIn = () => {
    Swal.fire({
      title: 'Confirm Check-In',
      text: "Are you sure you want to check in?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Check In',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('/attendance/check-in')
          .then(response => {
            toast.current.show({ severity: 'success', summary: 'Check-In Successful', detail: 'You have successfully checked in!', life: 3000 });
            setAttendanceRecords([...attendanceRecords, response.data]);
            setAlreadyCheckedIn(true); // Disable check-in after success
          })
          .catch(error => {
            if (error.response.status === 403) {
              toast.current.show({ severity: 'error', summary: 'Check-In Failed', detail: error.response.data.message, life: 3000 });
            } else {
              toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred during check-in.', life: 3000 });
              console.error('Error during check-in:', error);
            }
          });
      }
    });
  };

  // Function to handle Check-Out
  const handleCheckOut = (attendanceId) => {
    Swal.fire({
      title: 'Confirm Check-Out',
      text: "Are you sure you want to check out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Check Out',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`/attendance/check-out/${attendanceId}`)
          .then(response => {
            toast.current.show({ severity: 'success', summary: 'Check-Out Successful', detail: 'You have successfully checked out!', life: 3000 });
            setAttendanceRecords(attendanceRecords.map(record =>
              record.id === attendanceId ? response.data : record
            ));
          })
          .catch(error => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred during check-out.', life: 3000 });
            console.error('Error during check-out:', error);
          });
      }
    });
  };

  return (
    <div className="">
    <Toast ref={toast} /> {/* PrimeReact Toast */}

    <div className="flex flex-col bg-white shadow-lg rounded-xl p-8 w-full">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Attendance for <span className="text-blue-600">{auth.user.name}</span>
      </h1>

      {/* Check-In Button */}
      <button
        onClick={handleCheckIn}
        disabled={alreadyCheckedIn}
        className={`w-full py-3 px-5 mb-6 text-white text-lg font-bold rounded-lg shadow-lg transition-all duration-300 
        ${alreadyCheckedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {alreadyCheckedIn ? 'Already Checked In' : 'Check In'}
      </button>

      {/* Attendance Records */}
      {attendanceRecords.length > 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Attendance Records
          </h2>
          <div className="space-y-4">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Check-in:</span> {moment(record.check_in).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-green-600">Check-out:</span> {record.check_out ? moment(record.check_out).format('MMMM Do YYYY, h:mm:ss a') : 'Not checked out yet'}
                  </p>
                </div>

                {/* Check-Out Button */}
                {!record.check_out && (
                  <button
                    onClick={() => handleCheckOut(record.id)}
                    className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Check Out
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Empty State for No Records
        <div className="text-center text-gray-600 mt-6">
          <p className="text-lg font-semibold">No attendance records found for today</p>
          <p className="text-sm">You can check in to start tracking attendance.</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Attendance;
