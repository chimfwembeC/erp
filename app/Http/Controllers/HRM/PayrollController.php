<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payrolls = Payroll::with(['user'])->latest()->get();

        return Inertia::render("HRM/Payrolls/Index", [
            'payrolls' => $payrolls
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render("HRM/Payrolls/Create", [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|numeric',
            'amount' => 'required|numeric',
            'pay_date' => 'required|date',
            'status' => 'required|string'
        ]);
        // Convert the pay_date from ISO 8601 format to MySQL DATETIME format
        $payDate = Carbon::parse($validatedData['pay_date'])->format('Y-m-d H:i:s');
        // Check if the payroll already exists for the user on the given pay date
        $existingPayroll = Payroll::where('user_id', $validatedData['user_id'])            
            ->first();

        if ($existingPayroll) {
            // Return an error response if a payroll record already exists
            return redirect()->back()->withErrors([
                'pay_date' => 'A payroll entry already exists for this user.'
            ]);
        }
        Payroll::create([
            'user_id' => $validatedData['user_id'],
            'amount' => $validatedData['amount'],
            'pay_date' => $payDate,
            'status' => $validatedData['status'],

        ]);

        return redirect()->route('hrm.payrolls.index')->with('success', 'payroll added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payroll $payroll)
    {
        return Inertia::render("HRM/Payrolls/Show", [
            'payroll' => $payroll->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payroll $payroll)
    {
        $users = User::all();
        return Inertia::render("HRM/Payrolls/Edit", [
            'payroll' => $payroll,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payroll $payroll)
    {
        $validatedData = $request->validate([
            'user_id' => 'numeric',
            'amount' => 'required|numeric',
            'pay_date' => 'required|date',
            'status' => 'required|string'
        ]);

        $payDate = Carbon::parse($validatedData['pay_date'])->format('Y-m-d H:i:s');


        Payroll::create([
            'user_id' => $validatedData['user_id'],
            'amount' => $validatedData['amount'],
            'pay_date' => $payDate,
            'status' => $validatedData['status'],

        ]);

        return redirect()->route('hrm.payrolls.index')->with('success', 'payroll updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        //
        $payroll->delete();

        return redirect()->route('hrm.payrolls.index')->with('success', 'payroll deleted successfully.');
    }
}
