<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all bank accounts from the database
        $bankAccounts = BankAccount::all();

        // Return a view with the bank accounts data
        return inertia('AccountingAndFinance/BankAccounts/Index', ['bankAccounts' => $bankAccounts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return a view for creating a new bank account
        return inertia('AccountingAndFinance/BankAccounts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|unique:bank_accounts,account_number',
            'current_balance' => 'required|numeric|min:0',
        ]);

        // Create a new bank account in the database
        BankAccount::create($request->only(['account_name', 'account_number', 'current_balance']));

        // Redirect with a success message
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BankAccount $bankAccount)
    {
        // Find the bank account by ID
        // $bankAccount = BankAccount::findOrFail($id);

        // Return a view with the bank account details
        return inertia('AccountingAndFinance/BankAccounts/Show', ['bankAccount' => $bankAccount]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BankAccount $bankAccount)
    {
        // Find the bank account by ID
        // $bankAccount = BankAccount::findOrFail($id);

        // Return a view for editing the bank account
        return inertia('AccountingAndFinance/BankAccounts/Edit', ['bankAccount' => $bankAccount]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BankAccount $bankAccount)
    {
        // Validate the incoming request data
        $request->validate([
            'account_name' => 'required|string|max:255',
            'account_number' => 'required|string|unique:bank_accounts,account_number,' . $bankAccount->id,
            'current_balance' => 'required|numeric|min:0',
        ]);

        // Find the bank account by ID and update it
        // $bankAccount = BankAccount::findOrFail($id);
        $bankAccount->update($request->only(['account_name', 'account_number', 'current_balance']));

        // Redirect with a success message
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BankAccount $bankAccount)
    {
        // Find the bank account by ID and delete it
        // $bankAccount = BankAccount::findOrFail($id);
        $bankAccount->delete();

        // Redirect with a success message
        return redirect()->route('accounting.bank-accounts.index')->with('success', 'Bank account deleted successfully.');
    }
}
