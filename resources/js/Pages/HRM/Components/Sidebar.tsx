import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="text-white w-64 h-screen sticky top-0 p-6 overflow-y-auto  bg-gray-200 h-64">
      <nav className="space-y-4">
        <NavLink
          to="hrm"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-lg hover:text-white ${isActive ? 'bg-gray-800' : 'bg-gray-500'} hover:bg-gray-700`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/hrm/employees"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-lg hover:text-white ${isActive ? 'bg-gray-800' : 'bg-gray-500'} hover:bg-gray-700`
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/hrm/attendance"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-lg hover:text-white ${isActive ? 'bg-gray-800' : 'bg-gray-500'} hover:bg-gray-700`
          }
        >
          Attendance
        </NavLink>

        <NavLink
          to="/hrm/payroll"
          className={({ isActive }) =>
            `block py-2 px-4 rounded-lg hover:text-white ${isActive ? 'bg-gray-800' : 'bg-gray-500'} hover:bg-gray-700`
          }
        >
          Payroll
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
