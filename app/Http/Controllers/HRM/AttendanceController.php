<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
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

        return Inertia::render("HRM/AttendanceManagement/Index", [
            'attendances' => $attendances,
        ]);
    }

    public function create()
    {
        return Inertia::render("HRM/AttendanceManagement/Create", [
            'users' => User::all(),
            'statuses' => [
                ['name' => 'Check In', 'value' => 'check_in'],
                ['name' => 'Check Out', 'value' => 'check_out']
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|numeric',
            'status' => 'nullable',
            'check_in' => 'required|date',
            'check_out' => 'required|date',
        ]);
    
        // Convert ISO date strings to MySQL format
        $checkIn = Carbon::parse($validatedData['check_in'])->format('Y-m-d H:i:s');
        $checkOut = Carbon::parse($validatedData['check_out'])->format('Y-m-d H:i:s');
    
        $attendance = new Attendance();
        $attendance->user_id = $validatedData['user_id'];
        $attendance->check_in = $checkIn;
        $attendance->check_out = $checkOut;
        $attendance->status = $validatedData['status'] ? $validatedData['status'] : 'checked_in';
        $attendance->save();
    
        return redirect()->route('hrm.attendances.index');
    }

    public function edit($id)
    {
        $attendance = Attendance::find($id);

        return Inertia::render("HRM/AttendanceManagement/Edit", [
            'users' => User::all(),
            'statuses' => [
                ['name' => 'Check In', 'value' => 'check_in'],
                ['name' => 'Check Out', 'value' => 'check_out']
            ],

            'attendance' => $attendance
        ]);
    }

    public function show($id)
    {
        $attendance = Attendance::find($id);

        return Inertia::render("HRM/AttendanceManagement/Show", [
            'attendance' => $attendance->load('user'),
        ]);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|numeric',
            'status' => 'nullable',
            'check_in' => 'required|date',
            'check_out' => 'required|date',
        ]);
    
        // Convert ISO strings to MySQL datetime format using Carbon
        $validatedData['check_in'] = Carbon::parse($validatedData['check_in'])->format('Y-m-d H:i:s');
        $validatedData['check_out'] = Carbon::parse($validatedData['check_out'])->format('Y-m-d H:i:s');
    
        $attendance = Attendance::find($id);
        $attendance->user_id = $validatedData['user_id'];
        $attendance->check_in = $validatedData['check_in'];
        $attendance->check_out = $validatedData['check_out'];
        $attendance->status = $validatedData['status'] ? $validatedData['status'] : 'checked_in';
        $attendance->save();
    
        return redirect()->route('hrm.attendances.index');
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
