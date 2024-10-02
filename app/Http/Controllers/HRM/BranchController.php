<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $branches = Branch::with(['manager'])->get();

        return Inertia::render("HRM/Departments/Branches/Index", [
            'branches' => $branches
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
            'manager_id' => 'nullable',
        ]);

        Branch::create($validatedData);

        return redirect()->route('branches.index')->with('success', 'Branch updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Branch $branch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Branch $branch)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'manager_id' => 'nullable',
        ]);

        $branch->update($validatedData);

        return redirect()->route('branches.index')->with('success', 'Branch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Branch $branch)
    {
        //
        $branch->delete();

        return response()->json($branch);
    }
}
