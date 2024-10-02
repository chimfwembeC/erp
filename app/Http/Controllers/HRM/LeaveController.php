<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $leaveRequests = LeaveRequest::with(['user'])->latest()->get();
        return Inertia::render("HRM/LeaveManagement/Index",[
            'leaveRequests' => $leaveRequests,
        ]);
    }

    public function approve($id)
    {
        $leave = LeaveRequest::findOrFail($id);

        $leave->status = 'approved';
        $leave->save();

        return redirect()->back();
    }

    public function deny($id)
    {
        $leave = LeaveRequest::findOrFail($id);

        $leave->status = 'denied';
        $leave->save();

        return redirect()->back();
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeaveRequest $leaveRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveRequest $leaveRequest)
    {
        //
    }
}
