<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function getAttendance()
    {
        return Auth::user()->attendances; // List all attendance for the authenticated user
    }

    public function index()
    {
        $attendances = Attendance::with(['user'])
        ->latest()->get();

        return Inertia::render("HRM/AttendanceManagement/Index",[
            'attendances' => $attendances,
        ]);
    }
    
    public function checkIn()
    {
        // Get the current date without time (to compare only the date)
        $today = now()->startOfDay();

        // Check if the user has already checked in today
        $existingAttendance = Attendance::where('user_id', Auth::id())
            ->whereDate('check_in', $today)
            ->first();

        if ($existingAttendance) {
            // Return an error response if the user has already checked in today
            return response()->json([
                'message' => 'You have already checked in today.'
            ], 403);
        }

        // Proceed with the check-in
        $attendance = new Attendance();
        $attendance->user_id = Auth::id();
        $attendance->check_in = now();
        $attendance->status = 'checked_in';
        $attendance->save();

        return response()->json($attendance, 201);
    }

    public function checkOut($id)
    {
        $attendance = Attendance::findOrFail($id);
        if ($attendance->check_out) {
            return response()->json(['message' => 'Already checked out'], 403);
        }

        $attendance->check_out = now();
        $attendance->status = 'checked_out';
        $attendance->save();

        return response()->json($attendance);
    }
}
