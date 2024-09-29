import React from 'react'

export default function Employees() {
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Example card */}
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Total Employees</h3>
        <p className="text-2xl font-bold">120</p>
    </div>
</div>
    </div>
  )
}
