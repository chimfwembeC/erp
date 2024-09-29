<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $leaveRequests = LeaveRequest::latest()->get();

        return Inertia::render("LeaveRequest/Index",[
            'leaveRequests' => $leaveRequests
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
            // 'user_id' => '',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'status' => 'string',
        ]);

        LeaveRequest::create(array_merge($validatedData,['user_id' => auth()->user()->id, 'status' => 'pending']));

        return redirect()->route('leave-requests.index')->with('success', 'leave request created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveRequest $leaveRequest)
    {
        //
        return Inertia::render("Orders/Show",[
            'leaveRequest' => $leaveRequest->load(['user.departments'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveRequest $leaveRequest)
    {
        //
        return Inertia::render("Orders/Edit",[
            'leaveRequest' => $leaveRequest->load(['user.departments'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeaveRequest $leaveRequest)
    {
        //
        $validatedData = $request->validate([
            // 'user_id' => '',
            'start_date' => 'date',
            'end_date' => 'date',
            'status' => 'string',
        ]);

        $leaveRequest->update(array_merge($validatedData));

        return redirect()->route('leave-requests.index')->with('success', 'leave request updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveRequest $leaveRequest)
    {
        //
        $leaveRequest->delete();
        return redirect()->route('leave-requests.index')->with('success', 'leave request updated successfully.');
    }
}
