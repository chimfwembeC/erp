import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';

const Index = ({payrolls}) => {
    // const [payrolls, setPayrolls] = useState([]);

    // useEffect(() => {
    //     axios.get('/payroll').then((response) => {
    //         setPayrolls(response.data);
    //     });
    // }, []);

    return (
     <AppLayout title='Payroll Management'>
           <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Payroll Management</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Employee</th>
                        <th className="px-4 py-2 border-b">Pay Date</th>
                        <th className="px-4 py-2 border-b">Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((payroll) => (
                        <tr key={payroll.id}>
                            <td className="px-4 py-2 border-b">{payroll.user.name}</td>
                            <td className="px-4 py-2 border-b">{payroll.pay_date}</td>
                            <td className="px-4 py-2 border-b">{payroll.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     </AppLayout>
    );
};

export default Index;
