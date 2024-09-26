<?php

namespace App\Http\Controllers;

use App\Models\GeneralLedger;
use Illuminate\Http\Request;

class GeneralLedgerController extends Controller
{
     // List all ledger entries
     public function index()
     {
         $entries = GeneralLedger::with('account', 'user')->get();
         return response()->json($entries);
     }
 
     // Create a ledger entry (double-entry)
     public function store(Request $request)
     {
         $validated = $request->validate([
             'account_id' => 'required|exists:accounts,id',
             'user_id' => 'required|exists:users,id',
             'debit' => 'nullable|numeric',
             'credit' => 'nullable|numeric',
             'description' => 'required|string',
             'transaction_date' => 'required|date',
         ]);
 
         // Make sure either debit or credit is provided, but not both
         if (!$validated['debit'] && !$validated['credit']) {
             return response()->json(['message' => 'Either debit or credit is required'], 422);
         }
 
         $entry = GeneralLedger::create($validated);
         return response()->json($entry, 201);
     }
 
     // Show a single ledger entry
     public function show($id)
     {
         $entry = GeneralLedger::with('account', 'user')->findOrFail($id);
         return response()->json($entry);
     }
 
     // Delete a ledger entry
     public function destroy($id)
     {
         $entry = GeneralLedger::findOrFail($id);
         $entry->delete();
         return response()->json(['message' => 'Ledger entry deleted successfully']);
     }
}
