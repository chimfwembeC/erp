<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::where('role', 'employee')->latest()->get();
        return Inertia::render("HRM/EmployeeManagement/Index",[
            'employees' => $employees,
        ]);
    }
}
