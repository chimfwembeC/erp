<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\SalesInvoice;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleInvoiceController extends Controller
{
      // List all sales invoices
      public function index()
      {
          $saleInvoices = SalesInvoice::with('customer')->get();
          return Inertia::render("AccountingAndFinance/SaleInvoices/Index",[
            'saleInvoices' => $saleInvoices
          ]);
      }

      // create a single invoice
      public function create()
      {          
          return Inertia::render("AccountingAndFinance/SaleInvoices/Create",[
            'customers' => User::where('role','customer')->get(),
          ]);
      }
  
      // Show a single invoice
      public function show(SalesInvoice $saleInvoice)
      {          
          return Inertia::render("AccountingAndFinance/SaleInvoices/Show",[
            'invoice' => $saleInvoice->load('customer')
          ]);
      }

      // edit a single invoice
      public function edit(SalesInvoice $saleInvoice)
      {          
          return Inertia::render("AccountingAndFinance/SaleInvoices/Edit",[
            'invoice' => $saleInvoice,
            'customers' => User::where('role','customer')->get(),
          ]);
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
  
          $invoice = SalesInvoice::create([$validated, array_merge([
            'invoice_date' => Carbon::parse($validated['invoice_date']),
            'due_date' => Carbon::parse($validated['due_date']),
          ])]);
          return redirect()->route("accounting.sales-invoices.index");
      }
  
      // Update an invoice status (e.g., mark as paid)
      public function update(Request $request, SalesInvoice $saleInvoice)
      {          
  
          $validated = $request->validate([
              'status' => 'required|string',
              'total_amount' => 'required|numeric',
              'tax_amount' => 'nullable|numeric',
              'discount_amount' => 'nullable|numeric',
              'invoice_date' => 'nullable|date',
              'due_date' => 'nullable|date|after_or_equal:invoice_date',
          ]);
  
          $saleInvoice->update([$validated, array_merge([
            'invoice_date' => Carbon::parse($validated['invoice_date']),
            'due_date' => Carbon::parse($validated['due_date']),
          ])]);
          
          return redirect()->route("accounting.sales-invoices.index");
      }
  
      // Delete an invoice
      public function destroy($id)
      {
          $invoice = SalesInvoice::findOrFail($id);
          $invoice->delete();
          return redirect()->route("accounting.sales-invoices.index");
      }
}
