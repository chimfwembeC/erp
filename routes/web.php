<?php

// use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\HRM\HRMController;
use App\Http\Controllers\HRM\EmployeeController;
use App\Http\Controllers\HRM\AttendanceController;
use App\Http\Controllers\HRM\PayrollController;
use App\Http\Controllers\HRM\LeaveController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\PageController;

Route::get('/', function () {
    return view('landing-page', [
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
    Route::get('/', [HRMController::class, 'index'])->name('hrm.employees.index');
    // Employee Management Routes
    Route::get('/employees', [EmployeeController::class, 'index'])->name('hrm.employees.index');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('hrm.employees.store');
    Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('hrm.employees.show');
    Route::put('/employees/{id}', [EmployeeController::class, 'update'])->name('hrm.employees.update');
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('hrm.employees.destroy');

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

// { label: 'Overview', href: '/hrm' },
// { label: 'Departments', href: '/hrm/department' },
// { label: 'Branches', href: '/hrm/branches' },
// { label: 'Attendance Management', href: '/hrm/attendance' },
// { label: 'Employee Management', href: '/hrm/payroll' },
// { label: 'Leave Management', href: '/hrm/leave' },
// { label: 'User Management', href: '/hrm/user' },
// { label: 'Job Applications', href: '/hrm/job-applications' },

Route::get('/attendance', [AttendanceController::class, 'index']);
Route::post('/attendance/check-in', [AttendanceController::class, 'checkIn']);
Route::post('/attendance/check-out/{id}', [AttendanceController::class, 'checkOut']);

Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);

Route::post('/save-page', [PageController::class, 'savePage']);
Route::get('/page/{id}', [PageController::class, 'getPage']);
