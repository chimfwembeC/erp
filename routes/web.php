<?php

// use App\Http\Controllers\AttendanceController;
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

Route::prefix('hrm')->group(function () {
    // hrm dashboard
    Route::get('/', [HRMController::class, 'index'])->name('hrm.index');
    // Employee Management Routes
    Route::get('/employees', [EmployeeController::class, 'index'])->name('hrm.employees.index');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('hrm.employees.store');
    Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('hrm.employees.show');
    Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('hrm.employees.update');
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('hrm.employees.destroy');

    // Department Management Routes
    Route::get('/departments', [DepartmentController::class, 'index'])->name('hrm.departments.index');
    Route::post('/departments', [DepartmentController::class, 'store'])->name('hrm.departments.store');
    Route::get('/departments/{id}', [DepartmentController::class, 'show'])->name('hrm.departments.show');
    Route::put('/departments/{id}', [DepartmentController::class, 'update'])->name('hrm.departments.update');
    Route::delete('/departments/{id}', [DepartmentController::class, 'destroy'])->name('hrm.departments.destroy');


    // Branch Management Routes
    Route::get('/branches', [BranchController::class, 'index'])->name('hrm.branches.index');
    Route::post('/branches', [BranchController::class, 'store'])->name('hrm.branches.store');
    Route::get('/branches/{id}', [BranchController::class, 'show'])->name('hrm.branches.show');
    Route::put('/branches/{id}', [BranchController::class, 'update'])->name('hrm.branches.update');
    Route::delete('/branches/{id}', [BranchController::class, 'destroy'])->name('hrm.branches.destroy');

    // User Management Routes
    Route::get('/users', [UserController::class, 'index'])->name('hrm.users.index');
    Route::post('/users', [UserController::class, 'store'])->name('hrm.users.store');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('hrm.users.show');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('hrm.users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('hrm.users.destroy');

    // Job Management Routes
    Route::get('/jobs', [JobController::class, 'index'])->name('hrm.jobs.index');
    Route::post('/jobs', [JobController::class, 'store'])->name('hrm.jobs.store');
    Route::get('/jobs/{id}', [JobController::class, 'show'])->name('hrm.jobs.show');    
    Route::get('/jobs/{id}/edit', [JobController::class, 'edit'])->name('hrm.jobs.edit');
    Route::put('/jobs/{id}/update', [JobController::class, 'update'])->name('hrm.jobs.update');
    Route::delete('/jobs/{id}', [JobController::class, 'destroy'])->name('hrm.jobs.destroy');
    // Route::resource('jobs', JobController::class);
    // Job Applications Management Routes
    Route::get('/job-applications', [JobApplicationController::class, 'index'])->name('hrm.job-applications.index');
    Route::post('/job-applications', [JobApplicationController::class, 'store'])->name('hrm.job-applications.store');
    Route::get('/job-applications/{id}', [JobApplicationController::class, 'show'])->name('hrm.job-applications.show');
    Route::put('/job-applications/{id}', [JobApplicationController::class, 'update'])->name('hrm.job-applications.update');
    Route::delete('/job-applications/{id}', [JobApplicationController::class, 'destroy'])->name('hrm.job-applications.destroy');


    // Attendance Management Routes
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('hrm.attendance.index');
    Route::get('/get-attendance', [AttendanceController::class, 'getAttendance'])->name('hrm.attendance.getAttendance');

    Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn'])->name('hrm.attendance.checkIn');
    Route::post('/attendance/check-out', [AttendanceController::class, 'checkOut'])->name('hrm.attendance.checkOut');

    // Payroll Management Routes
    Route::get('/payrolls', [PayrollController::class, 'index'])->name('hrm.payrolls.index');
    Route::post('/payrolls', [PayrollController::class, 'generate'])->name('hrm.payrolls.generate');
    Route::get('/payrolls/{id}', [PayrollController::class, 'show'])->name('hrm.payrolls.show');

    // Leave Management Routes
    Route::get('/leaves', [LeaveController::class, 'index'])->name('hrm.leaves.index');
    Route::post('/leaves', [LeaveController::class, 'store'])->name('hrm.leaves.store');
    Route::put('/leaves/{id}/approve', [LeaveController::class, 'approve'])->name('hrm.leaves.approve');
    Route::put('/leaves/{id}/deny', [LeaveController::class, 'deny'])->name('hrm.leaves.deny');
});

Route::get('/attendance', [AttendanceController::class, 'index']);
Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn']);
Route::post('/attendance/check-out/{id}', [AttendanceController::class, 'checkOut']);

Route::resource('/landing-pages', LandingPagesController::class);
Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);

Route::post('/save-page', [PageController::class, 'savePage']);
Route::get('/page/{id}', [PageController::class, 'getPage']);
