<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::latest()->get();

        return Inertia::render("Payments/Index", [
            'payments' => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Payments/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validateData = $request->validate([
            'invoice_id' => 'required',
            'amount' => 'required|numeric',
            // 'payment_date' => 'date', 	
            'payment_method' => 'required|string'
        ]);
        
        Payment::create([
            'invoice_id' => $validateData['invoice_id'],
            'amount' => $validateData['amount'],
            'payment_method' => $validateData['payment_method'],
            'payment_date' => now(),
        ]);
        
        return redirect()->route('orders.index')->with('success', 'payments created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return Inertia::render("Payments/Show", [
            'payment' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        return Inertia::render("Payments/Edit", [
            'payment' => $payment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $validateData = $request->validate([
            'invoice_id' => 'required',
            'amount' => 'required|numeric',
            // 'payment_date' => 'date', 	
            'payment_method' => 'required|string'
        ]);
        
        $payment->update([
            'invoice_id' => $validateData['invoice_id'],
            'amount' => $validateData['amount'],
            'payment_method' => $validateData['payment_method'],
            'payment_date' => now(),
        ]);

        return redirect()->route('orders.index')->with('success', 'payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        
        return redirect()->route('orders.index')->with('success', 'payment deleted successfully.');
    }
}
