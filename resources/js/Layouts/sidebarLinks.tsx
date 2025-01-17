import React from 'react'
import { Activity, Bell, Brush, Clipboard, CreditCard, Database, DollarSign, FileText, Folder, Globe, HelpCircle, Home, LifeBuoy, Link, ListOrdered, Lock, Settings, Shield, ShoppingCart, User, Users, Warehouse } from "lucide-react";
import { FaFileInvoice, FaMoneyCheckAlt, FaProductHunt, FaProjectDiagram } from "react-icons/fa";
import useTypedPage from '@/Hooks/useTypedPage';
// import { useTranslation } from 'react-i18next';

// const { t } = useTranslation();
// Define the structure for sidebar links
interface SidebarLink {
    labelKey: string;
    icon?: React.ReactNode;
    href?: string;
    children?: SidebarLink[];
    badge?: string; // Badge for additional info
    divider?: boolean; // Flag to add a divider
    roles?: string[]; // Allowed roles for this link
}

const sidebarLinks: SidebarLink[] = [
    { labelKey: 'dashboard', divider: true, icon: <Home size={20} />, href: '/dashboard' },
    { labelKey: 'projects', icon: <Clipboard size={20} />, badge: '1+', href: '/projects', roles: ['customer',] },
    { labelKey: 'invoices', icon: <FileText size={20} />, badge: '5+', roles: ['customer'] },

    // Accounting & Finance Module
    {
        labelKey: 'accounting',
        icon: <DollarSign size={20} />,
        divider: true,
        roles: ['admin', 'finance'],
        children: [
            { labelKey: 'overview', href: '/accounting' },
            { labelKey: 'invoices', href: '/accounting/invoices' },
            {
                labelKey: 'payments',
                href: '/accounting/payments',
                badge: 'unpaid',
            },
            {
                labelKey: 'accounts',
                href: '/accounting/accounts',
            },
            { labelKey: 'generalLedgers', href: '/accounting/general-ledgers' },
            { labelKey: 'journalEntries', href: '/accounting/journal-entries' },
            {
                labelKey: 'salesInvoices',
                href: '/accounting/sales-invoices',
            },
            {
                labelKey: 'bankReconciliation',
                href: '/accounting/bank-reconciliations',
            },
            {
                labelKey: 'purchaseOrders',
                href: '/accounting/purchase-orders',
            },
            { labelKey: 'budgets', href: '/accounting/budgets' },
            { labelKey: 'taxes', href: '/accounting/taxes' },
            { labelKey: 'bankAccounts', href: '/accounting/bank-accounts' },
        ],
    },

    // Human Resources (HR) & Payroll Module
    {
        labelKey: 'hrmSystem',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'hrm'],
        children: [
            { labelKey: 'overview', href: '/hrm' },
            { labelKey: 'departments', href: '/hrm/departments' },
            { labelKey: 'branches', href: '/hrm/branches' },
            { labelKey: 'jobs', href: '/hrm/jobs' },
            { labelKey: 'applications', href: '/hrm/job-applications' },
            { labelKey: 'attendances', href: '/hrm/attendances', badge: 'new +10', },
            { labelKey: 'employees', href: '/hrm/employees' },
            { labelKey: 'leaves', href: '/hrm/leaves' },
            { labelKey: 'users', href: '/hrm/users' },
            {
                labelKey: 'payrollManagement',
                divider: true,
                children: [
                    { labelKey: 'payrolls', href: '/hrm/payrolls' },
                    { labelKey: 'payrollReports', href: '/hrm/payroll/reports' },
                ],
            },
            {
                labelKey: 'hrmSetup',
                icon: <Settings size={20} />,
                children: [
                    { labelKey: 'overview', href: '/hrm/setup' },
                    { labelKey: 'positions', href: '/hrm/positions' },
                    { labelKey: 'leaveTypes', href: '/hrm/leave-types' },
                    { labelKey: 'departmentGroups', href: '/hrm/department-groups' },
                    { labelKey: 'netPay', href: '/payroll/net-pay' },
                ],
            },
        ],
    },
    // Inventory & Warehouse Management Module
    {
        labelKey: 'Inventory System',
        icon: <ShoppingCart size={20} />,
        divider: true,
        roles: ['admin', 'inventory'],
        children: [
            { labelKey: 'overview', href: '/inventory' },
            {
                labelKey: 'products',
                href: '/inventory/products',
            },
            {
                labelKey: 'warehouses',
                href: '/inventory/warehouses',
            },
            { labelKey: 'inventoryMovements', href: '/inventory/inventory-movements' },
            {
                labelKey: 'productWarehouse',
                href: '/inventory/product-warehouses',
                // children: [
                //     { labelKey: 'Overview', href: '/inventory/product-warehouses' },
                //     { labelKey: 'Add Product To Warehouse', href: '/inventory/product-warehouses/create' },
                // ],
            },
        ],
    },
    // Sales & Order Management Module
    {
        labelKey: 'salesAndOrders',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'sales'],
        children: [
            { labelKey: 'overview', href: '/sale-orders' },
            { labelKey: 'orders', icon: <ListOrdered size={20} />, href: '/sale-orders/orders' },
            { labelKey: 'quotes', href: '/sale-orders/quotes' },
        ],
    },

    // CRM Module
    {
        labelKey: 'crm',
        icon: <User size={20} />,
        divider: true,
        roles: ['admin', 'crm'],
        children: [
            { labelKey: 'Leads', href: '/crm/leads' },
            { labelKey: 'Opportunities', href: '/crm/opportunities' },
            { labelKey: 'Customers', href: '/crm/customers' },
        ],
    },
    // POS Module
    {
        labelKey: 'projectManagement',
        icon: <FaProjectDiagram size={20} />,
        divider: true,
        roles: ['admin', 'project_manager', 'developer'], // Add roles for project management
        children: [
            { labelKey: 'Projects', href: '/projects' },
            { labelKey: 'Milestones', href: '/projects/milestones' },
            { labelKey: 'Tasks', href: '/projects/tasks' },
            { labelKey: 'Issues', href: '/projects/issues' },
            { labelKey: 'Reports', href: '/projects/reports' },
        ],
    },

    // POS Module
    {
        labelKey: 'pos',
        icon: <ShoppingCart size={20} />,
        divider: true,
        roles: ['admin', 'pos'],
        children: [
            { labelKey: 'Sales', href: '/pos/sales' },
            { labelKey: 'Inventory', href: '/pos/inventory' },
            { labelKey: 'Reports', href: '/pos/reports' },
        ],
    },

    // Support Module
    {
        labelKey: 'support',
        icon: <HelpCircle size={20} />,
        roles: ['admin', 'support', 'customer'],
        children: [
            {
                // labelKey: role === 'customer' ? 'My Tickets' : 'All Tickets', // Adjust labelKey dynamically
                labelKey: 'allTickets', // Adjust labelKey dynamically
                href: '/support/tickets',
                badge: '5+',
            },
            { labelKey: 'submitATicket', href: '/support/new-ticket', },
            { labelKey: 'knowledgeBase', href: '/support/knowledge-base', badge: '5+', },
        ],
    },
    // Settings Module
    {
        labelKey: 'settings',
        icon: <Settings size={20} />, // Main settings icon
        roles: ['admin'], // Restrict settings to admins
        children: [
            {
                labelKey: 'generalSettings',
                href: '/settings/general',
                icon: <Settings size={18} />, // General settings
            },
            {
                labelKey: 'userManagement',
                href: '/settings/users',
                icon: <Users size={18} />, // User management
            },
            {
                labelKey: 'notifications',
                href: '/settings/notifications',
                icon: <Bell size={18} />, // Notifications
            },
            {
                labelKey: 'systemLogs',
                href: '/settings/logs',
                icon: <Activity size={18} />, // System logs
            },
            {
                labelKey: 'languageSettings',
                href: '/settings/language',
                icon: <Globe size={18} />, // Language preferences
            },
            {
                labelKey: 'accessControl',
                href: '/settings/access-control',
                icon: <Lock size={18} />, // Access control
            },
            {
                labelKey: 'integrations',
                href: '/settings/integrations',
                icon: <Link size={18} />, // Integrations
            },
            {
                labelKey: 'dataManagement',
                href: '/settings/storage',
                icon: <Database size={18} />, // Data management
            },
            // {
            //     labelKey: 'billing',
            //     href: '/settings/billing',
            //     icon: <CreditCard size={18} />, // Billing and subscriptions
            // },
            {
                labelKey: 'securitySettings',
                href: '/settings/security',
                icon: <Shield size={18} />, // Security
            },
            {
                labelKey: 'customization',
                href: '/settings/customization',
                icon: <Brush size={18} />, // Customization
            },
        ],
    }

];

export default sidebarLinks;
