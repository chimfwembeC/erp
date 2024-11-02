<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    protected $fillable = ['user_id', 'total_amount', 'due_date', 'status'];

    // Display a listing of the invoices.
    public function index()
    {
        $invoices = Invoice::with(['user'])->get();
        
        return Inertia::render("AccountingAndFinance/Invoices/Index",[
            'invoices' => $invoices,
        ]);
    }

    // Show the form for creating a new invoice.
    public function create()
    {
        return Inertia::render("AccountingAndFinance/Invoices/Create",[
            'users' => User::all(),
        ]);
    }

    // Store a newly created invoice in storage.
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'due_date' => 'required|date',
            'status' => 'required|string|max:20',
        ]);
    
        // Convert the due_date to the proper format
        $dueDate = Carbon::parse($request->due_date)->format('Y-m-d H:i:s');
    
        // Create the invoice with the formatted due date
        $invoice = Invoice::create(array_merge(
            $request->only($this->fillable),
            ['due_date' => $dueDate]
        ));
        
        return redirect()->route('accounting.invoices.index');
    }
    

    // Display the specified invoice.
    public function show($id)
    {
        $invoice = Invoice::findOrFail($id);
        return response()->json($invoice);
    }

    // Show the form for editing the specified invoice.
    public function edit(Invoice $invoice)
    {
        return Inertia::render("AccountingAndFinance/Invoices/Edit",[
            'invoice' => $invoice,
            'users' => User::all(),
        ]);
    }

    // Update the specified invoice in storage.
    public function update(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);

        $request->validate([
            'total_amount' => 'nullable|numeric',
            'due_date' => 'nullable|date',
            'status' => 'nullable|string|max:20',
        ]);

        $dueDate = Carbon::parse($request->due_date)->format('Y-m-d H:i:s');

        $invoice->update(array_merge(
            $request->only($this->fillable),
            ['due_date' => $dueDate]
        ));
        
        return redirect()->route('accounting.invoices.index');
    }

    // Remove the specified invoice from storage.
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();
        
        return redirect()->route('accounting.invoices.index');
    }
}
