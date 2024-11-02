<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
   // List all accounts
   public function index()
   {
       $accounts = Account::with('parentAccount', 'childAccounts')->get();
       return response()->json($accounts);
   }

   // Show a single account
   public function show($id)
   {
       $account = Account::with('parentAccount', 'childAccounts')->findOrFail($id);
       return response()->json($account);
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
       return response()->json($account, 201);
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
       return response()->json($account);
   }

   // Delete an account
   public function destroy($id)
   {
       $account = Account::findOrFail($id);
       $account->delete();
       return response()->json(['message' => 'Account deleted successfully']);
   }
}
