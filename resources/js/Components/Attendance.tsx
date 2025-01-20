import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import moment from 'moment';

const Attendance = () => {
    const { auth } = usePage().props;
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for data fetching
    const toast = useRef(null);

    useEffect(() => {
        axios.get('/hrm/get-attendance')
            .then(response => {
                setAttendanceRecords(response.data);
                const today = new Date().toISOString().slice(0, 10);
                const todayCheckIn = response.data.some(record =>
                    record.check_in && record.check_in.startsWith(today)
                );
                setAlreadyCheckedIn(todayCheckIn);
                setLoading(false); // Stop loading after data is fetched
            })
            .catch(error => {
                console.error('Error fetching attendance data:', error);
                setLoading(false); // Stop loading if there is an error
            });
    }, []);

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
                setLoading(true); // Start loading during check-in
                axios.post('/hrm/attendance/check-in')
                    .then(response => {
                        toast.current.show({ severity: 'success', summary: 'Check-In Successful', detail: 'You have successfully checked in!', life: 3000 });
                        setAttendanceRecords([...attendanceRecords, response.data]);
                        setAlreadyCheckedIn(true);
                        setLoading(false);
                    })
                    .catch(error => {
                        toast.current.show({ severity: 'error', summary: 'Check-In Failed', detail: error.response?.data.message || 'An error occurred during check-in.', life: 3000 });
                        setLoading(false);
                    });
            }
        });
    };

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
                setLoading(true);
                axios.post(`/hrm/attendance/check-out/${attendanceId}`)
                    .then(response => {
                        toast.current.show({ severity: 'success', summary: 'Check-Out Successful', detail: 'You have successfully checked out!', life: 3000 });
                        setAttendanceRecords(attendanceRecords.map(record =>
                            record.id === attendanceId ? response.data : record
                        ));
                        setLoading(false);
                    })
                    .catch(error => {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred during check-out.', life: 3000 });
                        setLoading(false);
                    });
            }
        });
    };

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-xl p-8 w-full">
            <Toast ref={toast} />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Attendance for <span className="text-blue-600">{auth.user.name}</span>
            </h1>
            <button
                onClick={handleCheckIn}
                disabled={alreadyCheckedIn || loading}
                className={`w-full py-3 px-5 mb-6 text-white text-lg font-bold rounded-lg shadow-lg transition-all duration-300
        ${alreadyCheckedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Processing...' : alreadyCheckedIn ? 'Already Checked In' : 'Check In'}
            </button>

            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
            ) : (
                <>
                    {attendanceRecords.length > 0 ? (
                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                                Attendance Records
                            </h2>
                            <div className="space-y-4">
                                {attendanceRecords.map((record) => (
                                    <div key={record.id} className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-medium text-blue-600">Check-in:</span> {moment(record.check_in).format('MMMM Do YYYY, h:mm:ss a')}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <span className="font-medium text-green-600">Check-out:</span> {record.check_out ? moment(record.check_out).format('MMMM Do YYYY, h:mm:ss a') : 'Not checked out yet'}
                                            </p>
                                        </div>
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
                        <div className="text-center text-gray-600 dark:text-gray-300 mt-6">
                            <p className="text-lg font-semibold">No attendance records found for today</p>
                            <p className="text-sm">You can check in to start tracking attendance.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Attendance;
