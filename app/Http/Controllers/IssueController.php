<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $issues = Issue::all();
        return Inertia::render("PMS/Issues/Index", [
            'issues' => $issues
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
        $issue = Issue::create($request->all());
        return response()->json($issue, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $issue = Issue::findOrFail($id);
        return response()->json($issue);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Issue $issue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $issue = Issue::findOrFail($id);
        $issue->update($request->all());
        return response()->json($issue);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Issue::destroy($id);
        return response()->json(null, 204);
    }
}
