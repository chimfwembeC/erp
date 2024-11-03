<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
   // List all accounts
   public function index()
   {
       $accounts = Account::with('parentAccount', 'childAccounts')->get();
       return Inertia::render("AccountingAndFinance/Accounts/Index",[
        'accounts' => $accounts
       ]);
   }

   public function create()
   {
    return Inertia::render("AccountingAndFinance/Accounts/Create",[
        // 'accounts' => $accounts
       ]);
   }

   public function edit(Account $account)
   {
    return Inertia::render("AccountingAndFinance/Accounts/Edit",[
        'account' => $account
       ]);
   }

   // Show a single account
   public function show(Account $account)
   {       
       return Inertia::render("AccountingAndFinance/Accounts/Show",[
        'account' => $account
       ]);
   }

   // Create a new account
   public function store(Request $request)
   {
       $validated = $request->validate([
           'account_name' => 'required|string|max:255',
           'account_type' => 'required|string',
           'account_number' => 'required|string|unique:accounts',
           'parent_account_id' => 'nullable|exists:accounts,id',
       ]);

       $account = Account::create($validated);
       return redirect()->route('accounting.accounts.index');
   }

   // Update an existing account
   public function update(Request $request, $id)
   {
       $account = Account::findOrFail($id);

       $validated = $request->validate([
           'account_name' => 'required|string|max:255',
           'account_type' => 'required|string',
           'account_number' => 'required|string|unique:accounts,account_number,' . $id,
           'parent_account_id' => 'nullable|exists:accounts,id',
       ]);

       $account->update($validated);
       return redirect()->route('accounting.accounts.index');
   }

   // Delete an account
   public function destroy(Account $account)
   {    
       $account->delete();
       return redirect()->route('accounting.accounts.index');
   }
}
