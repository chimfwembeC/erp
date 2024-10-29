<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\DepartmentGroup;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $departments = Department::with(['manager', 'branch', 'departmentGroup'])->latest()->get();
        return Inertia::render("HRM/Departments/Index", [
            'departments' => $departments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("HRM/Departments/Create", [
            'groups' => DepartmentGroup::all(),
            'employees' => User::where('role', 'employee')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'manager_id' => 'nullable',
            'department_group_id' => 'nullable',
        ]);

        Department::create($validatedData);

        return redirect()->route('hrm.departments.index')->with('success', 'department updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $department = Department::with(['manager', 'branch', 'departmentGroup'])->find($id);
        return Inertia::render("HRM/Departments/Show", [
            'department' => $department
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $department = Department::find($id);

        return Inertia::render("HRM/Departments/Edit", [
            'department' => $department,
            'groups' => DepartmentGroup::all(),
            'employees' => User::where('role', 'employee')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'manager_id' => 'nullable',
            'department_group_id' => 'nullable',
        ]);
        // Find the department
        $department = Department::findOrFail($id);

        // Update the department
        $department->update($request->only('name', 'description', 'manager_id', 'department_group_id'));

        // $department->update($validatedData);

        return redirect()->route('hrm.departments.index')->with('success', 'department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $department = Department::find($id);
        $department->delete();

        return redirect()->route('hrm.departments.index');
    }
}
