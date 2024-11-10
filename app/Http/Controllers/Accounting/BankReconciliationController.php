<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\BankReconciliation;
use App\Models\BankAccount;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BankReconciliationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all bank reconciliations
        $bankReconciliations = BankReconciliation::with('bankAccount')->latest()->get();

        // Pass data to Inertia's BankReconciliations component
        return Inertia::render('AccountingAndFinance/BankReconciliations/Index', [
            'bankReconciliations' => $bankReconciliations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Retrieve all bank accounts for the form selection
        $bankAccounts = BankAccount::all();

        // Pass data to Inertia's BankReconciliationCreate component
        return Inertia::render('AccountingAndFinance/BankReconciliations/Create', [
            'bankAccounts' => $bankAccounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'reconciliation_date' => 'required|date',
            'statement_balance' => 'required|numeric',
            'opening_balance' => 'nullable|numeric',
            'closing_balance' => 'nullable|numeric',
            'ledger_balance' => 'required|numeric',
            'status' => 'required|string', // Assuming status is a required field
            'adjustments' => 'nullable|string', // Assuming adjustments is optional
            'notes' => 'nullable|string', // Assuming notes is optional
            // 'transaction_id' => 'required|exists:transactions,id', // Assuming transaction_id is required
        ]);
        $reconciliationDate = Carbon::parse($request->reconciliation_date)->format('Y-m-d H:i:s');

        // Create a new bank reconciliation
        BankReconciliation::create([
            'bank_account_id' => $request->bank_account_id,
            'reconciliation_date' => $reconciliationDate,
            'closing_balance' => $request->closing_balance,
            'opening_balance' => $request->opening_balance,
            'statement_balance' => $request->statement_balance,
            'ledger_balance' => $request->ledger_balance,
            'status' => $request->status,
            'adjustments' => $request->adjustments,
            'notes' => $request->notes,
            // 'transaction_id' => $request->transaction_id,
            'created_by' => auth()->id(), // Add the authenticated user ID as the creator
        ]);

        return redirect()->route('accounting.bank-reconciliations.index')->with('success', 'Bank Reconciliation created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(BankReconciliation $bankReconciliation)
    {
        // Pass data to Inertia's BankReconciliationShow component
        return Inertia::render('AccountingAndFinance/BankReconciliations/Show', [
            'bankReconciliation' => $bankReconciliation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BankReconciliation $bankReconciliation)
    {
        // Retrieve all bank accounts for the form selection
        $bankAccounts = BankAccount::all();

        // Pass data to Inertia's BankReconciliationEdit component
        return Inertia::render('AccountingAndFinance/BankReconciliations/Edit', [
            'reconciliationData' => $bankReconciliation,
            'bankAccounts' => $bankAccounts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BankReconciliation $bankReconciliation)
    {
        // Validate incoming request data
        $request->validate([
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'reconciliation_date' => 'required|date',
            'opening_balance' => 'nullable|numeric',
            'closing_balance' => 'nullable|numeric',
            'statement_balance' => 'required|numeric',
            'ledger_balance' => 'required|numeric',
            'status' => 'required|string', // Assuming status is required
            'adjustments' => 'nullable|string', // Assuming adjustments is optional
            'notes' => 'nullable|string', // Assuming notes is optional
            // 'transaction_id' => 'required|exists:transactions,id', // Assuming transaction_id is required
        ]);

        $reconciliationDate = Carbon::parse($request->reconciliation_date)->format('Y-m-d H:i:s');

        // Update the bank reconciliation
        $bankReconciliation->update([
            'bank_account_id' => $request->bank_account_id,
            'reconciliation_date' => $reconciliationDate,
            'statement_balance' => $request->statement_balance,
            'closing_balance' => $request->closing_balance,
            'opening_balance' => $request->opening_balance,
            'ledger_balance' => $request->ledger_balance,
            'status' => $request->status,
            'adjustments' => $request->adjustments,
            'notes' => $request->notes,
            // 'transaction_id' => $request->transaction_id,
            'updated_by' => auth()->id(), // Add the authenticated user ID as the updater
        ]);

        return redirect()->route('accounting.bank-reconciliations.index')->with('success', 'Bank Reconciliation updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BankReconciliation $bankReconciliation)
    {
        // Delete the specified bank reconciliation
        $bankReconciliation->delete();

        return redirect()->route('accounting.bank-reconciliations.index')->with('success', 'Bank Reconciliation deleted successfully.');
    }
}
