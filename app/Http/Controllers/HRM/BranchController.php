<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\User; // Assuming you have an Employee model for managers
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $branches = Branch::with(['manager'])->get();

        return Inertia::render("HRM/Branches/Index", [
            'branches' => $branches
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = User::where('role','employee')->get(['id', 'name']);
        return Inertia::render("HRM/Branches/Create", [
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        Branch::create($validatedData);

        return redirect()->route('hrm.branches.index')->with('success', 'Branch created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $branch = Branch::find($id);

        $branch->load('manager');
        return Inertia::render("HRM/Branches/Show", [
            'branch' => $branch
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $branch = Branch::find($id);

        $employees = User::where('role','employee')->get(['id', 'name']);
        return Inertia::render("HRM/Branches/Edit", [
            'branch' => $branch,
            'employees' => $employees,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        $branch->update($validatedData);

        return redirect()->route('hrm.branches.index')->with('success', 'Branch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('hrm.branches.index')->with('success', 'Branch deleted successfully.');
    }
}
