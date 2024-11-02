<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Response;
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
        return Inertia::render("HRM/LeaveManagement/Index", [
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
        $users = User::where('role', 'employee')->get();
        return Inertia::render("HRM/LeaveManagement/Create", [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        // Check if the user already has a pending leave request
        $pendingLeave = LeaveRequest::where('user_id', $validated['user_id'])
            ->where('status', 'pending')
            ->exists();

        if ($pendingLeave) {
            return redirect()->back()->withErrors([
                'error' => 'You already have a pending leave application. Please contact Human Resources for further assistance.',
            ]);
        }

        // Parse the date strings to the correct format
        $validated['start_date'] = Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s');
        $validated['end_date'] = Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s');

        // Create a new leave request
        LeaveRequest::create([
            'user_id' => $validated['user_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('hrm.leaves.index')->with('success', 'Leave request submitted successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(LeaveRequest $leaveRequest)
    {
        return Inertia::render("HRM/LeaveManagement/Show", [
            'leave' => $leaveRequest->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveRequest $leaveRequest)
    {
        $users = User::where('role', 'employee')->get();

        return Inertia::render("HRM/LeaveManagement/Edit", [
            'leave' => $leaveRequest,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeaveRequest $leaveRequest)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'status' => 'sometimes|required|string|in:pending,approved,denied',
        ]);

        // Parse the date strings to the correct format
        $validated['start_date'] = Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s');
        $validated['end_date'] = Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s');

        // Update the leave request
        $leaveRequest->update($validated);

        return redirect()->route('hrm.leaves.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveRequest $leaveRequest)
    {
        $leaveRequest->delete();

        return redirect()->route('hrm.leaves.index');
    }
}
