import React from 'react'
import { DollarSign, FileText, Folder, HelpCircle, Home, ListOrdered, ShoppingCart, User, Warehouse } from "lucide-react";
import { FaFileInvoice, FaMoneyCheckAlt, FaProductHunt } from "react-icons/fa";

// Define the structure for sidebar links
interface SidebarLink {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string; // Badge for additional info
    divider?: boolean; // Flag to add a divider
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', divider: true, icon: <Home size={20} />, href: '/dashboard' },

    // Accounting & Finance Module
    {
        label: 'Accounting',
        icon: <DollarSign size={20} />,
        divider: true,
        children: [
            { label: 'Overview', href: '/accounting' },
            { label: 'Invoices', href: '/accounting/invoices' },
            {
                label: 'Payments',
                href: '/accounting/payments',
                icon: <FaMoneyCheckAlt size={20} />,
                children: [
                    { label: 'Overview', href: '/accounting/payments' },
                    { label: 'Make Payment', href: '/accounting/payments/create' },
                    { label: 'Payment History', href: '/accounting/payments/history' },
                ],
            },
            {
                label: 'Accounts',
                href: '/accounting/accounts',
                icon: <FaMoneyCheckAlt size={20} />,
                children: [
                    { label: 'Overview', href: '/accounting/accounts' },
                    { label: 'Account Settings', href: '/accounting/accounts/settings' },
                    { label: 'Account Balances', href: '/accounting/accounts/balances' },
                    { label: 'Transaction History', href: '/accounting/accounts/transaction-history' },
                ],
            },
            { label: 'General Ledgers', href: '/accounting/general-ledgers' },
            { label: 'Journal Entries', href: '/accounting/journal-entries' },
            {
                label: 'Sales Invoices',
                href: '/accounting/sales-invoices',
                icon: <FaFileInvoice size={20} />,
                children: [
                    { label: 'Overview', href: '/accounting/sales-invoices' },
                    { label: 'Create Sales Invoice', href: '/accounting/sales-invoices/create' },
                    { label: 'Sales Invoice History', href: '/accounting/sales-invoices/history' },
                ],
            },
            {
                label: 'Bank Reconciliation',
                href: '/accounting/bank-reconciliations',
                icon: <ListOrdered size={20} />,
                children: [
                    { label: 'Overview', href: '/accounting/bank-reconciliations' },
                    { label: 'Create Reconciliation', href: '/accounting/bank-reconciliations/create' },
                ],
            },
            {
                label: 'Purchase Orders',
                href: '/accounting/purchase-orders',
                icon: <ListOrdered size={20} />,
                children: [
                    { label: 'Overview', href: '/accounting/purchase-orders' },
                    { label: 'Create Purchase Order', href: '/accounting/purchase-orders/create' },
                    { label: 'Purchase Order History', href: '/accounting/purchase-orders/history' },
                ],
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
        children: [
            { label: 'Overview', href: '/hrm' },
            { label: 'Departments', href: '/hrm/departments' },
            { label: 'Branches', href: '/hrm/branches' },
            { label: 'Jobs', href: '/hrm/jobs' },
            { label: 'Applications', href: '/hrm/job-applications' },
            { label: 'Attendances', href: '/hrm/attendances' },
            { label: 'Employees', href: '/hrm/employees' },
            { label: 'Leaves', href: '/hrm/leaves' },
            { label: 'Users', href: '/hrm/users' },
            {
                label: 'Payroll Management',
                icon: <FileText size={20} />,
                children: [
                    { label: 'Payrolls', href: '/hrm/payrolls' },
                    { label: 'Payroll Reports', href: '/hrm/payroll/reports' },
                ],
            },
            {
                label: 'HRM Setup',
                icon: <FileText size={20} />,
                children: [
                    { label: 'Positions', href: '/hrm/positions' },
                    { label: 'Leave Types', href: '/hrm/leave-types' },
                    { label: 'Department Groups', href: '/hrm/department-groups' },
                    { label: 'Net Pay', href: '/payroll/net-pay' },
                    { label: 'HRM Setup', href: '/hrm/setup' },
                ],
            },
        ],
    },
    // Inventory & Warehouse Management Module
    {
        label: 'Inventory System',
        icon: <ShoppingCart size={20} />,
        divider: true,
        children: [
            { label: 'Overview', href: '/inventory' },
            {
                label: 'Products',
                href: '/inventory/products',
                icon: <FaProductHunt size={20} />,
                children: [
                    { label: 'Overview', href: '/inventory/products' },
                    { label: 'Add New Product', href: '/inventory/products/create' },
                    { label: 'Product Categories', href: '/inventory/products/categories' },
                    { label: 'Product Suppliers', href: '/inventory/products/suppliers' },
                    { label: 'Product Inventory', href: '/inventory/products/inventory' },
                ],
            },
            {
                label: 'Warehouses',
                href: '/inventory/warehouses',
                icon: <Warehouse size={20} />,
                children: [
                    { label: 'Overview', href: '/inventory/warehouses' },
                    { label: 'Add New Warehouse', href: '/inventory/warehouses/create' },
                    { label: 'Warehouse Locations', href: '/inventory/warehouses/locations' },
                ],
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
        children: [
            { label: 'Tickets', href: '/support/tickets' },
            { label: 'Knowledge Base', href: '/support/knowledge-base' },
        ],
    },
];

export default sidebarLinks;
