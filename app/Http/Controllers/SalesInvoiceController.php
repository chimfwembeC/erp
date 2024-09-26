<?php

namespace App\Http\Controllers;

use App\Models\SalesInvoice;
use Illuminate\Http\Request;

class SalesInvoiceController extends Controller
{
    // List all sales invoices
    public function index()
    {
        $invoices = SalesInvoice::with('customer')->get();
        return response()->json($invoices);
    }

    // Show a single invoice
    public function show($id)
    {
        $invoice = SalesInvoice::with('customer')->findOrFail($id);
        return response()->json($invoice);
    }

    // Create a new sales invoice
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'tax_amount' => 'nullable|numeric',
            'discount_amount' => 'nullable|numeric',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'status' => 'required|string',
        ]);

        $invoice = SalesInvoice::create($validated);
        return response()->json($invoice, 201);
    }

    // Update an invoice status (e.g., mark as paid)
    public function update(Request $request, $id)
    {
        $invoice = SalesInvoice::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $invoice->update($validated);
        return response()->json($invoice);
    }

    // Delete an invoice
    public function destroy($id)
    {
        $invoice = SalesInvoice::findOrFail($id);
        $invoice->delete();
        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}
