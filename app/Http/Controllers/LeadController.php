<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // $validateData = $request->validate([
        //     // 'lead_status' => '',
        //     'follow_up_date' => '' 	
        // ]);

        Lead::create([
            'lead_status' => 'pending',
            'follow_up_date' => now(),
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('leads.index')->with('success', 'lead create successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lead $lead)
    {
          $validateData = $request->validate([
            'lead_status' => 'string',
            // 'follow_up_date' => '' 	
        ]);

        $lead->update([
            'lead_status' => $validateData['lead_status'],
            'follow_up_date' => now(),
            // 'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('leads.index')->with('success', 'lead create successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('leads.index')->with('success', 'lead deleted successfully.');

    }
}
