import AppLayout from '@/Layouts/AppLayout'
import React from 'react'
import AttendanceComponent from '@/Components/Attendance';
import moment from 'moment';

export default function Attendance({attendances}) {

  console.log('attendances',attendances);
  return (
    <AppLayout title='Attendance'>
                 <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Manage Attendances</h1>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Link Branch and Department</button> */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Check In</th>
                        <th className="px-4 py-2 border-b">Check Out</th>
                        <th className="px-4 py-2 border-b">Status</th>

                        {/* <th className="px-4 py-2 border-b">Department</th> */}
                    </tr>
                </thead>
                <tbody>
                    {attendances.map((item) => (
                        <tr key={item.id}>
                            <td className="px-4 py-2 border-b">{item.user?.name}</td>
                            <td className="px-4 py-2 border-b">{moment(item.check_in).format('MMMM Do YYYY')}</td>
                            <td className="px-4 py-2 border-b">{item.check_out ? moment(item.check_out).format('MMMM Do YYYY') : 'Not checked out yet'}</td>
                            <td className="px-4 py-2 border-b">{item.status === 'checked_in' ? (
                              <span className='bg-green-500 text-white text-sm p-2 rounded-lg'>Checked In</span> 
                            ) : (
                              <span className='bg-orange-500 text-white text-sm p-2 rounded-lg'>Checked Out</span>
                            ) }</td>

                            {/* <td className="px-4 py-2 border-b">{item.department.name}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </AppLayout>
  )
}
