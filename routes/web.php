<?php

// use App\Http\Controllers\AttendanceController;

use App\Http\Controllers\Accounting\AccountController;
use App\Http\Controllers\Accounting\AccountingController;
use App\Http\Controllers\Accounting\BankAccountController;
use App\Http\Controllers\Accounting\BankReconciliationController;
use App\Http\Controllers\Accounting\BudgetController;
use App\Http\Controllers\Accounting\GeneralLedgerController;
use App\Http\Controllers\Accounting\InvoiceController;
use App\Http\Controllers\Accounting\JournalEntryController;
use App\Http\Controllers\Accounting\PaymentController;
use App\Http\Controllers\Accounting\PurchaseOrderController;
use App\Http\Controllers\Accounting\SaleInvoiceController;
use App\Http\Controllers\Accounting\TaxController;
use App\Http\Controllers\AuditAndCompliance\AuditAndComplianceController;
use App\Http\Controllers\HRM\HRMController;
use App\Http\Controllers\HRM\EmployeeController;
use App\Http\Controllers\HRM\AttendanceController;
use App\Http\Controllers\HRM\BranchController;
use App\Http\Controllers\HRM\DepartmentController;
use App\Http\Controllers\HRM\DepartmentGroupController;
use App\Http\Controllers\HRM\JobApplicationController;
use App\Http\Controllers\HRM\JobController;
use App\Http\Controllers\HRM\PayrollController;
use App\Http\Controllers\HRM\LeaveController;
use App\Http\Controllers\HRM\UserController;
use App\Http\Controllers\InventoryAndWarehouse\InventoryAndWarehouseController;
use App\Http\Controllers\InventoryAndWarehouse\InventoryMovementController;
use App\Http\Controllers\InventoryAndWarehouse\ProductController;
use App\Http\Controllers\InventoryAndWarehouse\ProductWarehouseController;
use App\Http\Controllers\InventoryAndWarehouse\WarehouseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SettingController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SalesAndOrders\OrderController;
use App\Http\Controllers\SalesAndOrders\OrderItemController;
use App\Http\Controllers\SalesAndOrders\QuoteController;
use App\Http\Controllers\SalesAndOrders\SalesAndOrderController;

Route::get('/', function () {
    // return view('landing-page', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
});


// Human resource management routes
Route::prefix('hrm')->group(function () {
    // hrm dashboard
    Route::get('/', [HRMController::class, 'index'])->name('hrm.index');

    // Employee Management Routes
    Route::get('/employees', [EmployeeController::class, 'index'])->name('hrm.employees.index');
    Route::get('/employees/create', [EmployeeController::class, 'create'])->name('hrm.employees.create');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('hrm.employees.store');
    Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('hrm.employees.show');
    Route::get('/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('hrm.employees.edit');
    Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('hrm.employees.update');
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('hrm.employees.destroy');

    // Department Management Routes

    Route::get('/departments', [DepartmentController::class, 'index'])->name('hrm.departments.index');
    Route::get('/departments/create', [DepartmentController::class, 'create'])->name('hrm.departments.create');
    Route::post('/departments', [DepartmentController::class, 'store'])->name('hrm.departments.store');
    Route::get('/departments/{id}', [DepartmentController::class, 'show'])->name('hrm.departments.show');
    Route::get('/departments/{id}/edit', [DepartmentController::class, 'edit'])->name('hrm.departments.edit'); // Fixed route
    Route::put('/departments/{id}', [DepartmentController::class, 'update'])->name('hrm.departments.update');
    Route::delete('/departments/{id}', [DepartmentController::class, 'destroy'])->name('hrm.departments.destroy');

    Route::get('/department-groups', [DepartmentGroupController::class, 'index'])->name('hrm.department-groups.index');
    Route::get('/department-groups/create', [DepartmentGroupController::class, 'create'])->name('hrm.department-groups.create');
    Route::post('/department-groups', [DepartmentGroupController::class, 'store'])->name('hrm.department-groups.store');
    Route::post('/department-groups/{departmentGroup}/link', [DepartmentGroupController::class, 'linkDepartments'])->name('hrm.department-groups.link-department');
    Route::get('/department-groups/{departmentGroup}', [DepartmentGroupController::class, 'show'])->name('hrm.department-groups.show');
    Route::get('/department-groups/{departmentGroup}/edit', [DepartmentGroupController::class, 'edit'])->name('hrm.department-groups.edit'); // Fixed route
    Route::put('/department-groups/{departmentGroup}', [DepartmentGroupController::class, 'update'])->name('hrm.department-groups.update');
    Route::delete('/department-groups/{departmentGroup}', [DepartmentGroupController::class, 'destroy'])->name('hrm.department-groups.destroy');
    Route::delete('/department-groups/{group}/unlink-department/{department}', [DepartmentGroupController::class, 'unlinkDepartment'])->name('hrm.department-groups.unlink-department');




    // Branch Management Routes
    Route::get('/branches', [BranchController::class, 'index'])->name('hrm.branches.index');
    Route::get('/branches/create', [BranchController::class, 'create'])->name('hrm.branches.create');
    Route::post('/branches', [BranchController::class, 'store'])->name('hrm.branches.store');
    Route::get('/branches/{id}', [BranchController::class, 'show'])->name('hrm.branches.show');
    Route::get('/branches/{id}/edit', [BranchController::class, 'edit'])->name('hrm.branches.edit');
    Route::put('/branches/{id}', [BranchController::class, 'update'])->name('hrm.branches.update');
    Route::delete('/branches/{id}', [BranchController::class, 'destroy'])->name('hrm.branches.destroy');

    // User Management Routes
    Route::get('/users', [UserController::class, 'index'])->name('hrm.users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('hrm.users.create');
    Route::post('/users', [UserController::class, 'store'])->name('hrm.users.store');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('hrm.users.show');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('hrm.users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('hrm.users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('hrm.users.destroy');

    // Job Management Routes
    Route::get('/jobs', [JobController::class, 'index'])->name('hrm.jobs.index');
    Route::post('/jobs', [JobController::class, 'store'])->name('hrm.jobs.store');
    Route::post('/jobs/create', [JobController::class, 'create'])->name('hrm.jobs.create');
    Route::get('/jobs/{id}', [JobController::class, 'show'])->name('hrm.jobs.show');
    Route::get('/jobs/{id}/edit', [JobController::class, 'edit'])->name('hrm.jobs.edit');
    Route::put('/jobs/{postedJob}/update', [JobController::class, 'update'])->name('hrm.jobs.update');
    Route::delete('/jobs/{id}', [JobController::class, 'destroy'])->name('hrm.jobs.destroy');

    // Job Applications Management Routes
    Route::get('/job-applications', [JobApplicationController::class, 'index'])->name('hrm.job-applications.index');
    Route::get('/job-applications/create', [JobApplicationController::class, 'create'])->name('hrm.job-applications.create');
    Route::post('/job-applications', [JobApplicationController::class, 'store'])->name('hrm.job-applications.store');
    Route::get('/job-applications/{jobApplication}', [JobApplicationController::class, 'show'])->name('hrm.job-applications.show');
    Route::get('/job-applications/{jobApplication}/edit', [JobApplicationController::class, 'edit'])->name('hrm.job-applications.edit');
    Route::patch('/job-applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('hrm.job-applications.update');
    Route::delete('/job-applications/{jobApplication}', [JobApplicationController::class, 'destroy'])->name('hrm.job-applications.destroy');


    // Attendance Management Routes
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('hrm.attendances.index');
    Route::get('/attendances/create', [AttendanceController::class, 'create'])->name('hrm.attendances.create');
    Route::post('/attendances', [AttendanceController::class, 'store'])->name('hrm.attendances.store');
    Route::get('/attendances/{id}', [AttendanceController::class, 'show'])->name('hrm.attendances.show');
    Route::get('/attendances/{id}/edit', [AttendanceController::class, 'edit'])->name('hrm.attendances.edit');
    Route::put('/attendances/{id}', [AttendanceController::class, 'update'])->name('hrm.attendances.update');
    Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy'])->name('hrm.attendances.destroy');

    // Extra route for user check, checkout and getting a list of all attandances
    Route::get('/get-attendance', [AttendanceController::class, 'getAttendance'])->name('hrm.attendance.getAttendance');
    Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn']);
    Route::post('/attendance/check-out/{id}', [AttendanceController::class, 'checkOut']);

    // Payroll Management Routes
    Route::get('/payrolls', [PayrollController::class, 'index'])->name('hrm.payrolls.index');
    Route::get('/payrolls/create', [PayrollController::class, 'create'])->name('hrm.payrolls.create');
    Route::post('/payrolls', [PayrollController::class, 'store'])->name('hrm.payrolls.store');
    Route::post('/payrolls/generate', [PayrollController::class, 'generate'])->name('hrm.payrolls.generate');
    Route::get('/payrolls/{payroll}', [PayrollController::class, 'show'])->name('hrm.payrolls.show');
    Route::get('/payrolls/{payroll}/edit', [PayrollController::class, 'edit'])->name('hrm.payrolls.edit');
    Route::put('/payrolls/{payroll}', [PayrollController::class, 'update'])->name('hrm.payrolls.update');
    Route::delete('/payrolls/{payroll}', [PayrollController::class, 'destroy'])->name('hrm.payrolls.destroy');


    // Leave Management Routes
    Route::get('/leaves', [LeaveController::class, 'index'])->name('hrm.leaves.index');
    Route::get('/leaves/create', [LeaveController::class, 'create'])->name('hrm.leaves.create');
    Route::post('/leaves', [LeaveController::class, 'store'])->name('hrm.leaves.store');
    Route::get('/leaves/{leaveRequest}', [LeaveController::class, 'show'])->name('hrm.leaves.show');
    Route::put('/leaves/{leaveRequest}', [LeaveController::class, 'update'])->name('hrm.leaves.update');
    Route::get('/leaves/{leaveRequest}/edit', [LeaveController::class, 'edit'])->name('hrm.leaves.edit');
    Route::delete('/leaves/{leaveRequest}', [LeaveController::class, 'destroy'])->name('hrm.leaves.destroy');
    Route::put('/leaves/{leaveRequest}/approve', [LeaveController::class, 'approve'])->name('hrm.leaves.approve');
    Route::put('/leaves/{leaveRequest}/deny', [LeaveController::class, 'deny'])->name('hrm.leaves.deny');
});


// accounting management module routes
Route::prefix('accounting')->group(function () {

    Route::get('/', [AccountingController::class, 'index'])->name('accounting.index');

    // accounts Routes
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounting.accounts.index');
    Route::get('/accounts/create', [AccountController::class, 'create'])->name('accounting.accounts.create');
    Route::post('/accounts', [AccountController::class, 'store'])->name('accounting.accounts.store');
    Route::get('/accounts/{account}', [AccountController::class, 'show'])->name('accounting.accounts.show');
    Route::put('/accounts/{account}', [AccountController::class, 'update'])->name('accounting.accounts.update');
    Route::get('/accounts/{account}/edit', [AccountController::class, 'edit'])->name('accounting.accounts.edit');
    Route::delete('/accounts/{account}', [AccountController::class, 'destroy'])->name('accounting.accounts.destroy');

    // Invoices Routes
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('accounting.invoices.index');
    Route::get('/invoices/create', [InvoiceController::class, 'create'])->name('accounting.invoices.create');
    Route::post('/invoices', [InvoiceController::class, 'store'])->name('accounting.invoices.store');
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show'])->name('accounting.invoices.show');
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update'])->name('accounting.invoices.update');
    Route::get('/invoices/{invoice}/edit', [InvoiceController::class, 'edit'])->name('accounting.invoices.edit');
    Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy'])->name('accounting.invoices.destroy');

    // Invoices Routes
    Route::get('/payments', [PaymentController::class, 'index'])->name('accounting.payments.index');
    Route::get('/payments/create', [PaymentController::class, 'create'])->name('accounting.payments.create');
    Route::post('/payments', [PaymentController::class, 'store'])->name('accounting.payments.store');
    Route::get('/payments/{payment}', [PaymentController::class, 'show'])->name('accounting.payments.show');
    Route::put('/payments/{payment}', [PaymentController::class, 'update'])->name('accounting.payments.update');
    Route::get('/payments/{payment}/edit', [PaymentController::class, 'edit'])->name('accounting.payments.edit');
    Route::delete('/payments/{payment}', [PaymentController::class, 'destroy'])->name('accounting.payments.destroy');

    // Sale Invoices Routes
    Route::get('/sales-invoices', [SaleInvoiceController::class, 'index'])->name('accounting.sales-invoices.index');
    Route::get('/sales-invoices/create', [SaleInvoiceController::class, 'create'])->name('accounting.sales-invoices.create');
    Route::post('/sales-invoices', [SaleInvoiceController::class, 'store'])->name('accounting.sales-invoices.store');
    Route::get('/sales-invoices/{saleInvoice}', [SaleInvoiceController::class, 'show'])->name('accounting.sales-invoices.show');
    Route::put('/sales-invoices/{saleInvoice}', [SaleInvoiceController::class, 'update'])->name('accounting.sales-invoices.update');
    Route::get('/sales-invoices/{saleInvoice}/edit', [SaleInvoiceController::class, 'edit'])->name('accounting.sales-invoices.edit');
    Route::delete('/sale-invoices/{saleInvoice}', [SaleInvoiceController::class, 'destroy'])->name('accounting.sales-invoices.destroy');

    // Bank accounts Invoices Routes
    Route::get('/bank-accounts', [BankAccountController::class, 'index'])->name('accounting.bank-accounts.index');
    Route::get('/bank-accounts/create', [BankAccountController::class, 'create'])->name('accounting.bank-accounts.create');
    Route::post('/bank-accounts', [BankAccountController::class, 'store'])->name('accounting.bank-accounts.store');
    Route::get('/bank-accounts/{bankAccount}', [BankAccountController::class, 'show'])->name('accounting.sbank-accounts.show');
    Route::put('/bank-accounts/{bankAccount}', [BankAccountController::class, 'update'])->name('accounting.bank-accounts.update');
    Route::get('/bank-accounts/{bankAccount}/edit', [BankAccountController::class, 'edit'])->name('accounting.bank-accounts.edit');
    Route::delete('/bank-accounts/{bankAccount}', [BankAccountController::class, 'destroy'])->name('accounting.bank-accounts.destroy');


    // budget Routes
    Route::get('/budgets', [BudgetController::class, 'index'])->name('accounting.budgets.index');
    Route::get('/budgets/create', [BudgetController::class, 'create'])->name('accounting.budgets.create');
    Route::post('/budgets', [BudgetController::class, 'store'])->name('accounting.budgets.store');
    Route::get('/budgets/{budget}', [BudgetController::class, 'show'])->name('accounting.budgets.show');
    Route::put('/budgets/{budget}', [BudgetController::class, 'update'])->name('accounting.budgets.update');
    Route::get('/budgets/{budget}/edit', [BudgetController::class, 'edit'])->name('accounting.budgets.edit');
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy'])->name('accounting.budgets.destroy');


    // taxs Routes
    Route::get('/taxes', [TaxController::class, 'index'])->name('accounting.taxes.index');
    Route::get('/taxes/create', [TaxController::class, 'create'])->name('accounting.taxes.create');
    Route::post('/taxes', [TaxController::class, 'store'])->name('accounting.taxes.store');
    Route::get('/taxes/{tax}', [TaxController::class, 'show'])->name('accounting.taxes.show');
    Route::put('/taxes/{tax}', [TaxController::class, 'update'])->name('accounting.taxes.update');
    Route::get('/taxes/{tax}/edit', [TaxController::class, 'edit'])->name('accounting.taxes.edit');
    Route::delete('/taxes/{tax}', [TaxController::class, 'destroy'])->name('accounting.taxes.destroy');

    // general ledgers Routes
    Route::get('/general-ledgers', [GeneralLedgerController::class, 'index'])->name('accounting.general-ledgers.index');
    Route::get('/general-ledgers/create', [GeneralLedgerController::class, 'create'])->name('accounting.general-ledgers.create');
    Route::post('/general-ledgers', [GeneralLedgerController::class, 'store'])->name('accounting.general-ledgers.store');
    Route::get('/general-ledgers/{generalLedger}', [GeneralLedgerController::class, 'show'])->name('accounting.general-ledgers.show');
    Route::put('/general-ledgers/{generalLedger}', [GeneralLedgerController::class, 'update'])->name('accounting.general-ledgers.update');
    Route::get('/general-ledgers/{generalLedger}/edit', [GeneralLedgerController::class, 'edit'])->name('accounting.general-ledgers.edit');
    Route::delete('/general-ledgers/{generalLedger}', [GeneralLedgerController::class, 'destroy'])->name('accounting.general-ledgers.destroy');

    // general journal entries Routes
    Route::get('/journal-entries', [JournalEntryController::class, 'index'])->name('accounting.journal-entries.index');
    Route::get('/journal-entries/create', [JournalEntryController::class, 'create'])->name('accounting.journal-entries.create');
    Route::post('/journal-entries', [JournalEntryController::class, 'store'])->name('accounting.journal-entries.store');
    Route::get('/journal-entries/{journalEntry}', [JournalEntryController::class, 'show'])->name('accounting.journal-entries.show');
    Route::put('/journal-entries/{journalEntry}', [JournalEntryController::class, 'update'])->name('accounting.journal-entries.update');
    Route::get('/journal-entries/{journalEntry}/edit', [JournalEntryController::class, 'edit'])->name('accounting.journal-entries.edit');
    Route::delete('/journal-entries/{journalEntry}', [JournalEntryController::class, 'destroy'])->name('accounting.journal-entries.destroy');


    // purchase orders Routes
    Route::get('/purchase-orders', [PurchaseOrderController::class, 'index'])->name('accounting.purchase-orders.index');
    Route::get('/purchase-orders/create', [PurchaseOrderController::class, 'create'])->name('accounting.purchase-orders.create');
    Route::post('/purchase-orders', [PurchaseOrderController::class, 'store'])->name('accounting.purchase-orders.store');
    Route::get('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'show'])->name('accounting.purchase-orders.show');
    Route::put('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'update'])->name('accounting.purchase-orders.update');
    Route::get('/purchase-orders/{purchaseOrder}/edit', [PurchaseOrderController::class, 'edit'])->name('accounting.purchase-orders.edit');
    Route::delete('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'destroy'])->name('accounting.purchase-orders.destroy');

     // bank reconciliations Routes
     Route::get('/bank-reconciliations', [BankReconciliationController::class, 'index'])->name('accounting.bank-reconciliations.index');
     Route::get('/bank-reconciliations/create', [BankReconciliationController::class, 'create'])->name('accounting.bank-reconciliations.create');
     Route::post('/bank-reconciliations', [BankReconciliationController::class, 'store'])->name('accounting.bank-reconciliations.store');
     Route::get('/bank-reconciliations/{bankReconciliation}', [BankReconciliationController::class, 'show'])->name('accounting.bank-reconciliations.show');
     Route::put('/bank-reconciliations/{bankReconciliation}', [BankReconciliationController::class, 'update'])->name('accounting.bank-reconciliations.update');
     Route::get('/bank-reconciliations/{bankReconciliation}/edit', [BankReconciliationController::class, 'edit'])->name('accounting.bank-reconciliations.edit');
     Route::delete('/bank-reconciliations/{bankReconciliation}', [BankReconciliationController::class, 'destroy'])->name('accounting.bank-reconciliations.destroy');
});


Route::prefix('inventory')->group(function () {
    // inventory and warehouse home route
    Route::get('/', [InventoryAndWarehouseController::class, 'index'])->name('inventory.index');

 // products Routes
 Route::get('/products', [ProductController::class, 'index'])->name('inventory.products.index');
 Route::get('/products/create', [ProductController::class, 'create'])->name('inventory.products.create');
 Route::post('/products', [ProductController::class, 'store'])->name('inventory.products.store');
 Route::get('/products/{product}', [ProductController::class, 'show'])->name('inventory.products.show');
 Route::put('/products/{product}', [ProductController::class, 'update'])->name('inventory.products.update');
 Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('inventory.products.edit');
 Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('inventory.products.destroy');


//  product_warehouse

// warehouses Routes
Route::get('/warehouses', [WarehouseController::class, 'index'])->name('inventory.warehouses.index');
Route::get('/warehouses/create', [WarehouseController::class, 'create'])->name('inventory.warehouses.create');
Route::post('/warehouses', [WarehouseController::class, 'store'])->name('inventory.warehouses.store');
Route::get('/warehouses/{warehouse}', [WarehouseController::class, 'show'])->name('inventory.warehouses.show');
Route::put('/warehouses/{warehouse}', [WarehouseController::class, 'update'])->name('inventory.warehouses.update');
Route::get('/warehouses/{warehouse}/edit', [WarehouseController::class, 'edit'])->name('inventory.warehouses.edit');
Route::delete('/warehouses/{warehouse}', [WarehouseController::class, 'destroy'])->name('inventory.warehouses.destroy');


// inventory movement Routes
Route::get('/inventory-movements', [InventoryMovementController::class, 'index'])->name('inventory.inventory_movements.index');
Route::get('/inventory-movements/create', [InventoryMovementController::class, 'create'])->name('inventory.inventory_movements.create');
Route::post('/inventory-movements', [InventoryMovementController::class, 'store'])->name('inventory.inventory_movements.store');
Route::get('/inventory-movements/{inventoryMovement}', [InventoryMovementController::class, 'show'])->name('inventory.inventory_movements.show');
Route::put('/inventory-movements/{inventoryMovement}', [InventoryMovementController::class, 'update'])->name('inventory.inventory_movements.update');
Route::get('/inventory-movements/{inventoryMovement}/edit', [InventoryMovementController::class, 'edit'])->name('inventory.inventory_movements.edit');
Route::delete('/inventory-movements/{inventoryMovement}', [InventoryMovementController::class, 'destroy'])->name('inventory.inventory_movements.destroy');

// product warehouses Routes
Route::get('/product-warehouses', [ProductWarehouseController::class, 'index'])->name('inventory.product-warehouses.index');
Route::get('/product-warehouses/create', [ProductWarehouseController::class, 'create'])->name('inventory.product-warehouses.create');
Route::post('/product-warehouses', [ProductWarehouseController::class, 'store'])->name('inventory.product-warehouses.store');
Route::get('/product-warehouses/{productWarehouse}', [ProductWarehouseController::class, 'show'])->name('inventory.product-warehouses.show');
Route::put('/product-warehouses/{productWarehouse}', [ProductWarehouseController::class, 'update'])->name('inventory.product-warehouses.update');
Route::get('/product-warehouses/{productWarehouse}/edit', [ProductWarehouseController::class, 'edit'])->name('inventory.product-warehouses.edit');
Route::delete('/product-warehouses/{productWarehouse}', [ProductWarehouseController::class, 'destroy'])->name('inventory.product-warehouses.destroy');


//
});

Route::prefix('audit-trails')->group(function () {
    Route::get('/', [AuditAndComplianceController::class, 'index'])->name('audit-trails.index');

});


Route::prefix('sale-orders')->group(function () {
    Route::get('/', [SalesAndOrderController::class, 'index'])->name('sale-orders.index');

    Route::get('/orders', [OrderController::class, 'index'])->name('sale-orders.orders.index');
    Route::get('/orders/create', [OrderController::class, 'create'])->name('sale-orders.orders.create');
    Route::post('/orders/addItems/{orderId}', [OrderController::class, 'addItemsToOrder'])->name('sale-orders.orders.addItemsToOrder');
    Route::post('/orders', [OrderController::class, 'store'])->name('sale-orders.orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('sale-orders.orders.show');
    Route::get('/orders/{order}/edit', [OrderController::class, 'edit'])->name('sale-orders.orders.edit');
    Route::put('/orders/{order}', [OrderController::class, 'update'])->name('sale-orders.orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('sale-orders.orders.destroy');

    // order items
    Route::post('/order-items', [OrderItemController::class, 'store'])->name('sale-orders.order-items.store');
    Route::get('/order-items/{orderItem}', [OrderItemController::class, 'show'])->name('sale-orders.order-items.show');
    Route::put('/order-items/{orderItem}', [OrderItemController::class, 'update'])->name('sale-orders.order-items.update');
    Route::delete('/order-items/{orderItem}', [OrderItemController::class, 'destroy'])->name('sale-orders.order-items.destroy');


    // quotes
    Route::get('/quotes', [QuoteController::class, 'index'])->name('sale-orders.quotes.index');
    Route::get('/quotes/create', [QuoteController::class, 'create'])->name('sale-orders.quotes.create');
    Route::post('/quotes', [QuoteController::class, 'store'])->name('sale-orders.quotes.store');
    Route::get('/quotes/{quote}', [QuoteController::class, 'show'])->name('sale-orders.quotes.show');
    Route::get('/quotes/{quote}/edit', [QuoteController::class, 'edit'])->name('sale-orders.quotes.edit');
    Route::put('/quotes/{quote}', [QuoteController::class, 'update'])->name('sale-orders.quotes.update');
    Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy'])->name('sale-orders.quotes.destroy');


});


Route::prefix('settings')->group(function () {
    Route::get('/general', [SettingController::class, 'index']);
    Route::get('/notifications', [SettingController::class, 'index']);
    Route::get('/users', [SettingController::class, 'index']);



});


Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);
Route::resource('/landing-pages', LandingPagesController::class);


Route::post('/save-page', [PageController::class, 'savePage']);
Route::get('/page/{id}', [PageController::class, 'getPage']);
