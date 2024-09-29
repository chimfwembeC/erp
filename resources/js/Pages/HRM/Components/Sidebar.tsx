import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-full p-6 overflow-y-auto">
      <nav className="space-y-4">
        <NavLink
          to="/hrm"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/hrm/employees"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/hrm/attendance"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
          }
        >
          Attendance
        </NavLink>

        <NavLink
          to="/hrm/payroll"
          className={({ isActive }) =>
            `flex items-center py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
          }
        >
          Payroll
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
