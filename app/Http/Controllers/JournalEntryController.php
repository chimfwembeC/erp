<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use App\Models\JournalEntryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JournalEntryController extends Controller
{
     // List all journal entries
     public function index()
     {
         $entries = JournalEntry::with('journalItems.account')->get();
         return response()->json($entries);
     }
 
     // Show a single journal entry
     public function show($id)
     {
         $entry = JournalEntry::with('journalItems.account')->findOrFail($id);
         return response()->json($entry);
     }
 
     // Create a new journal entry
     public function store(Request $request)
     {
         $validated = $request->validate([
             'reference' => 'required|string|unique:journal_entries',
             'description' => 'required|string',
             'total_debit' => 'required|numeric',
             'total_credit' => 'required|numeric',
             'entry_date' => 'required|date',
             'items' => 'required|array|min:2', // must have at least one debit and one credit
             'items.*.account_id' => 'required|exists:accounts,id',
             'items.*.debit' => 'nullable|numeric',
             'items.*.credit' => 'nullable|numeric',
         ]);
 
         // Check that debits match credits
         $totalDebit = collect($validated['items'])->sum('debit');
         $totalCredit = collect($validated['items'])->sum('credit');
         if ($totalDebit != $totalCredit) {
             return response()->json(['message' => 'Total debits must match total credits'], 422);
         }
 
         DB::transaction(function () use ($validated) {
             $journalEntry = JournalEntry::create([
                 'reference' => $validated['reference'],
                 'description' => $validated['description'],
                 'total_debit' => $validated['total_debit'],
                 'total_credit' => $validated['total_credit'],
                 'entry_date' => $validated['entry_date'],
             ]);
 
             foreach ($validated['items'] as $item) {
                 JournalEntryItem::create([
                     'journal_entry_id' => $journalEntry->id,
                     'account_id' => $item['account_id'],
                     'debit' => $item['debit'],
                     'credit' => $item['credit'],
                 ]);
             }
         });
 
         return response()->json(['message' => 'Journal entry created successfully'], 201);
     }
 
     // Delete a journal entry
     public function destroy($id)
     {
         $entry = JournalEntry::findOrFail($id);
         $entry->delete();
         return response()->json(['message' => 'Journal entry deleted successfully']);
     }
}
