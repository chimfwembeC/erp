<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
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
        // Validate the incoming request
        $validated = $request->validate([
            // 'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|string|in:pending,approved,rejected',
        ]);

        // Create a new leave request
        $leaveRequest = LeaveRequest::create(array_merge($validated,['user_id' => auth()->user()->id]));

        return response()->json($leaveRequest, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveRequest $leaveRequest)
    {
        return response()->json($leaveRequest);
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
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'status' => 'sometimes|required|string|in:pending,approved,rejected',
        ]);

        // Update the leave request
        $leaveRequest->update($validated);

        return response()->json($leaveRequest);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveRequest $leaveRequest)
    {
        $leaveRequest->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
