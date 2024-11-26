<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\DepartmentGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("HRM/DepartmentGroups/Index",[
            'groups' => DepartmentGroup::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("HRM/DepartmentGroups/Create",[
            // 'users' => DepartmentGroup::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        DepartmentGroup::create($validated);

        return redirect()->route('hrm.department-groups.index')->with('success', 'Departmemt Group created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(DepartmentGroup $departmentGroup)
    {
        return Inertia::render("HRM/DepartmentGroups/Show",[
            'group' => $departmentGroup->load(['departments']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DepartmentGroup $departmentGroup)
    {
        return Inertia::render("HRM/DepartmentGroups/Edit",[
            'group' => $departmentGroup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DepartmentGroup $departmentGroup)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $departmentGroup->update($validated);

        return redirect()->route('hrm.department-groups.index')->with('success', 'Departmemt Group updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DepartmentGroup $departmentGroup)
    {
        $departmentGroup->delete();

        return redirect()->route('hrm.department-groups.index')->with('success', 'Departmemt Group updated successfully.');
    }
}
