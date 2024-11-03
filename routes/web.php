<?php

// use App\Http\Controllers\AttendanceController;

use App\Http\Controllers\Accounting\AccountController;
use App\Http\Controllers\Accounting\AccountingController;
use App\Http\Controllers\Accounting\InvoiceController;
use App\Http\Controllers\Accounting\PaymentController;
use App\Http\Controllers\HRM\HRMController;
use App\Http\Controllers\HRM\EmployeeController;
use App\Http\Controllers\HRM\AttendanceController;
use App\Http\Controllers\HRM\BranchController;
use App\Http\Controllers\HRM\DepartmentController;
use App\Http\Controllers\HRM\JobApplicationController;
use App\Http\Controllers\HRM\JobController;
use App\Http\Controllers\HRM\PayrollController;
use App\Http\Controllers\HRM\LeaveController;
use App\Http\Controllers\HRM\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\PageController;

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
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
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
});

Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);
Route::resource('/landing-pages', LandingPagesController::class);


Route::post('/save-page', [PageController::class, 'savePage']);
Route::get('/page/{id}', [PageController::class, 'getPage']);
