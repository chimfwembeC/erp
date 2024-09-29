<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payrolls = Payroll::latest()->get();

        return Inertia::render("Payrolls/Index",[
            'payrolls' => $payrolls
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render("Payrolls/Create",[
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

        Payroll::create([
            'user_id' => $validatedData['user_id'],
            'amount' => $validatedData['amount'],
            'pay_date' => $validatedData['pay_date'],
            'status' => $validatedData['status'],

        ]);

        return redirect()->route('payrolls.index')->with('success', 'payroll added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payroll $payroll)
    {
        return Inertia::render("Payrolls/Show",[
            'payroll' => $payroll
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payroll $payroll)
    {
        $users = User::all();
        return Inertia::render("Payrolls/Edit",[
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

        Payroll::create([
            'user_id' => $validatedData['user_id'],
            'amount' => $validatedData['amount'],
            'pay_date' => $validatedData['pay_date'],
            'status' => $validatedData['status'],

        ]);
        
        return redirect()->route('payrolls.index')->with('success', 'payroll updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payroll $payroll)
    {
        //
        $payroll->delete();

        return redirect()->route('payrolls.index')->with('success', 'payroll deleted successfully.');
    }
}
