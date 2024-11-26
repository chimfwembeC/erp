<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\DepartmentGroup;
use App\Models\DepartmentGroupLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("HRM/DepartmentGroups/Index", [
            'groups' => DepartmentGroup::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("HRM/DepartmentGroups/Create", [
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
        return Inertia::render("HRM/DepartmentGroups/Show", [
            'group' => $departmentGroup->load(['departments']),
            'departments' => Department::all(),
        ]);
    }

    /**
     * Link departments to a department group.
     */
    public function linkDepartments(Request $request, DepartmentGroup $departmentGroup)
    {
        $request->validate([
            'departments' => 'required|array',
            'departments.*' => 'exists:departments,id',
        ]);


        $departmentGroup->departments()->sync($request->departments);

        return redirect()->back()->with('success', 'Departments linked successfully.');
    }

    /**
     * Unlink departments to a department group.
     */
    public function unlinkDepartment(DepartmentGroup $group, Department $department)
    {
        try {
            // Check if the department is part of the group
            if ($group->departments()->where('department_id', $department->id)->exists()) {
                // Unlink the department from the group
                $group->departments()->detach($department->id);

            return redirect()->back()->with('success', 'Departments linked successfully.');

            }

            return response()->json([
                'error' => 'Department not found in the group.',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error unlinking department: ' . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred while unlinking the department.',
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DepartmentGroup $departmentGroup)
    {
        return Inertia::render("HRM/DepartmentGroups/Edit", [
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
