import React from 'react'
import { Clipboard, DollarSign, FileText, Folder, HelpCircle, Home, LifeBuoy, ListOrdered, Settings, ShoppingCart, User, Warehouse } from "lucide-react";
import { FaFileInvoice, FaMoneyCheckAlt, FaProductHunt } from "react-icons/fa";
import useTypedPage from '@/Hooks/useTypedPage';
// import { useTranslation } from 'react-i18next';

// const { t } = useTranslation();
// Define the structure for sidebar links
interface SidebarLink {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string; // Badge for additional info
    divider?: boolean; // Flag to add a divider
    roles?: string[]; // Allowed roles for this link
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', divider: true, icon: <Home size={20} />, href: '/dashboard' },
    { label: 'Projects', icon: <Clipboard size={20} />, badge: '1+', href: '/projects', roles: ['customer',] },
    { label: 'Invoices', icon: <FileText size={20} />, badge: '5+', roles: ['customer'] },

    // Accounting & Finance Module
    {
        label: 'Accounting',
        icon: <DollarSign size={20} />,
        divider: true,
        roles: ['admin', 'finance'],
        children: [
            { label: 'Overview', href: '/accounting' },
            { label: 'Invoices', href: '/accounting/invoices' },
            {
                label: 'Payments',
                href: '/accounting/payments',
                badge: 'unpaid',
            },
            {
                label: 'Accounts',
                href: '/accounting/accounts',
            },
            { label: 'General Ledgers', href: '/accounting/general-ledgers' },
            { label: 'Journal Entries', href: '/accounting/journal-entries' },
            {
                label: 'Sales Invoices',
                href: '/accounting/sales-invoices',
            },
            {
                label: 'Bank Reconciliation',
                href: '/accounting/bank-reconciliations',
            },
            {
                label: 'Purchase Orders',
                href: '/accounting/purchase-orders',
            },
            { label: 'Budgets', href: '/accounting/budgets' },
            { label: 'Taxes', href: '/accounting/taxes' },
            { label: 'Bank Accounts', href: '/accounting/bank-accounts' },
        ],
    },

    // Human Resources (HR) & Payroll Module
    {
        label: 'HRM System',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'hrm'],
        children: [
            { label: 'Overview', href: '/hrm' },
            { label: 'Departments', href: '/hrm/departments' },
            { label: 'Branches', href: '/hrm/branches' },
            { label: 'Jobs', href: '/hrm/jobs' },
            { label: 'Applications', href: '/hrm/job-applications' },
            { label: 'Attendances', href: '/hrm/attendances', badge: 'new +10', },
            { label: 'Employees', href: '/hrm/employees' },
            { label: 'Leaves', href: '/hrm/leaves' },
            { label: 'Users', href: '/hrm/users' },
            {
                label: 'Payroll Management',
                divider: true,
                children: [
                    { label: 'Payrolls', href: '/hrm/payrolls' },
                    { label: 'Payroll Reports', href: '/hrm/payroll/reports' },
                ],
            },
            {
                label: 'HRM Setup',
                icon: <Settings size={20} />,
                children: [
                    { label: 'Overview', href: '/hrm/setup' },
                    { label: 'Positions', href: '/hrm/positions' },
                    { label: 'Leave Types', href: '/hrm/leave-types' },
                    { label: 'Department Groups', href: '/hrm/department-groups' },
                    { label: 'Net Pay', href: '/payroll/net-pay' },
                ],
            },
        ],
    },
    // Inventory & Warehouse Management Module
    {
        label: 'Inventory System',
        icon: <ShoppingCart size={20} />,
        divider: true,
        roles: ['admin', 'inventory'],
        children: [
            { label: 'Overview', href: '/inventory' },
            {
                label: 'Products',
                href: '/inventory/products',
            },
            {
                label: 'Warehouses',
                href: '/inventory/warehouses',
            },
            { label: 'Inventory Movements', href: '/inventory/inventory-movements' },
            {
                label: 'Product Warehouse',
                href: '/inventory/product-warehouses',
                children: [
                    { label: 'Overview', href: '/inventory/product-warehouses' },
                    { label: 'Add Product To Warehouse', href: '/inventory/product-warehouses/create' },
                ],
            },
        ],
    },
    // Sales & Order Management Module
    {
        label: 'Sales and Orders',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'sales'],
        children: [
            { label: 'Overview', href: '/sale-orders' },
            { label: 'Orders', icon: <ListOrdered size={20} />, href: '/sale-orders/orders' },
            { label: 'Quotes', href: '/sale-orders/quotes' },
        ],
    },

    // CRM Module
    {
        label: 'CRM',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'crm'],
        children: [
            { label: 'Leads', href: '/crm/leads' },
            { label: 'Opportunities', href: '/crm/opportunities' },
            { label: 'Customers', href: '/crm/customers' },
        ],
    },

    // POS Module
    {
        label: 'POS',
        icon: <ShoppingCart size={20} />,
        divider: true,
        roles: ['admin', 'pos'],
        children: [
            { label: 'Sales', href: '/pos/sales' },
            { label: 'Inventory', href: '/pos/inventory' },
            { label: 'Reports', href: '/pos/reports' },
        ],
    },

    // Support Module
    {
        label: 'Support',
        icon: <HelpCircle size={20} />,
        roles: ['admin', 'support', 'customer'],
        children: [
            {
                // label: role === 'customer' ? 'My Tickets' : 'All Tickets', // Adjust label dynamically
                label: 'All Tickets', // Adjust label dynamically
                href: '/support/tickets',
                badge: '5+',
            },
            { label: 'Submit a Ticket', href: '/support/new-ticket', },
            { label: 'Knowledge Base', href: '/support/knowledge-base', badge: '5+', },
        ],
    },
];

export default sidebarLinks;
