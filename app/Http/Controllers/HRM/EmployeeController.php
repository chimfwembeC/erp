<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    // Display a listing of employees
    public function index()
    {
        $employees = User::with(['department'])->where('role', 'employee')->latest()->get();
        return Inertia::render("HRM/EmployeeManagement/Index", [
            'employees' => $employees,
        ]);
    }

    // Show the form for creating a new employee
    public function create()
    {
        $employees = User::where('role', 'employee')->latest()->get();
        return Inertia::render('HRM/EmployeeManagement/Create',[
            'employees' => $employees,
        ]);
    }

    // Store a newly created employee in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
            // Add other validation rules as needed
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            // Add other fields as necessary
        ]);

        return redirect()->route('hrm.employees.index')->with('success', 'Employee created successfully.');
    }

    // Display the specified employee
    public function show($id)
    {
        $employee = User::with(['department','managedDepartments','managedBranches','branch', 'attendances'])->find($id);
        return Inertia::render('HRM/EmployeeManagement/Show', [
            'employee' => $employee,
        ]);
    }

    // Show the form for editing the specified employee
    public function edit($id)
    {
        $employee = User::where('role', 'employee')->where('id', $id)->first();        

        return Inertia::render('HRM/EmployeeManagement/Edit', [
            'employee' => $employee,            
        ]);
    }

    // Update the specified employee in storage
    public function update(Request $request, $id)
    {
        $employee = User::find($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $employee->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string',
            // Add other validation rules as needed
        ]);

        $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            // Update password only if provided
            'password' => $request->password ? Hash::make($request->password) : $employee->password,
            // Add other fields as necessary
        ]);

        return redirect()->route('hrm.employees.index')->with('success', 'Employee updated successfully.');
    }

    // Remove the specified employee from storage
    public function destroy(User $employee)
    {
        $employee->delete();
        return redirect()->route('hrm.employees.index')->with('success', 'Employee deleted successfully.');
    }
}
