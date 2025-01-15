<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use Illuminate\Http\Request;

class MilestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $milestones = Milestone::all();
        return response()->json($milestones);
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
        $milestone = Milestone::create($request->all());
        return response()->json($milestone, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $milestone = Milestone::findOrFail($id);
        return response()->json($milestone);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Milestone $milestone)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $milestone = Milestone::findOrFail($id);
        $milestone->update($request->all());
        return response()->json($milestone);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Milestone::destroy($id);
        return response()->json(null, 204);
    }
}
