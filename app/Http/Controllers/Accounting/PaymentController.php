<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\SalesInvoice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with(['invoice.customer'])->latest()->get();

        return Inertia::render("AccountingAndFinance/Payments/Index", [
            'payments' => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("AccountingAndFinance/Payments/Create",[
            'invoices' => SalesInvoice::with(['customer'])->latest()->get(),
        ]);
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
        
        return redirect()->route('accounting.payments.index')->with('success', 'payment updated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return Inertia::render("AccountingAndFinance/Payments/Show", [
            'payment' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        return Inertia::render("AccountingAndFinance/Payments/Edit", [
            'payment' => $payment,
            'invoices' => SalesInvoice::with(['customer'])->latest()->get(),
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
            // 'payment_date' => Carbon::parse($validateData['payment_date']),
        ]);

        return redirect()->route('accounting.payments.index')->with('success', 'payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();
        
        return redirect()->route('accounting.payments.index')->with('success', 'payment updated successfully.');
    }
}
