<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\JournalEntry;
use App\Models\JournalEntryItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class JournalEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Index",[
            'journalEntries' => JournalEntry::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Create",[
            'accounts' => Account::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 'reference', 'description', 'total_debit', 'total_credit', 'entry_date'
        $validated = $request->validate([
            'reference' => 'required|string|unique:journal_entries',
            'description' => 'required|string',
            'total_debit' => 'required|numeric',
            'total_credit' => 'required|numeric',
            'entry_date' => 'nullable|date',
            'items' => 'required|array|min:2', // must have at least one debit and one credit
            'items.*.account_id' => 'required|exists:accounts,id',
            'items.*.debit' => 'nullable|numeric',
            'items.*.credit' => 'nullable|numeric',
        ]);

        $entryDate = Carbon::parse(now());

        // Check that debits match credits
        $totalDebit = collect($validated['items'])->sum('debit');
        $totalCredit = collect($validated['items'])->sum('credit');
        if ($totalDebit != $totalCredit) {
            return response()->json(['message' => 'Total debits must match total credits'], 422);
        }

        DB::transaction(function () use ($validated, $entryDate) {
            $journalEntry = JournalEntry::create([
                'reference' => $validated['reference'],
                'description' => $validated['description'],
                'total_debit' => $validated['total_debit'],
                'total_credit' => $validated['total_credit'],
                'entry_date' => $entryDate,
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

        return redirect()->route("accounting.journal-entries.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(JournalEntry $journalEntry)
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Show",[
            'journalEntry' => $journalEntry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JournalEntry $journalEntry)
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Edit",[
            'journalEntry' => $journalEntry->load('journalItems.account'),
            'accounts' => Account::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JournalEntry $journalEntry)
    {
        $validated = $request->validate([
            'reference' => 'required|string|unique:journal_entries,reference,' . $journalEntry->id,
            'description' => 'required|string',
            'total_debit' => 'required|numeric',
            'total_credit' => 'required|numeric',
            'entry_date' => 'nullable|date',
            'items' => 'required|array|min:2', // must have at least one debit and one credit
            'items.*.account_id' => 'required|exists:accounts,id',
            'items.*.debit' => 'nullable|numeric',
            'items.*.credit' => 'nullable|numeric',
        ]);
    
        $entryDate = Carbon::parse($validated['entry_date'])->format('Y-m-d H:i:s');
    
        // Check that total debits match total credits
        $totalDebit = collect($validated['items'])->sum('debit');
        $totalCredit = collect($validated['items'])->sum('credit');
        if ($totalDebit != $totalCredit) {
            return response()->json(['message' => 'Total debits must match total credits'], 422);
        }
    
        DB::transaction(function () use ($journalEntry, $validated, $entryDate) {
            // Update journal entry details
            $journalEntry->update([
                'reference' => $validated['reference'],
                'description' => $validated['description'],
                'total_debit' => $validated['total_debit'],
                'total_credit' => $validated['total_credit'],
                'entry_date' => $entryDate,
            ]);
    
            // Delete old journal entry items
            $journalEntry->journalItems()->delete();
    
            // Create updated journal entry items
            foreach ($validated['items'] as $item) {
                JournalEntryItem::create([
                    'journal_entry_id' => $journalEntry->id,
                    'account_id' => $item['account_id'],
                    'debit' => $item['debit'],
                    'credit' => $item['credit'],
                ]);
            }
        });
    
        return redirect()->route("accounting.journal-entries.index")
                         ->with('success', 'Journal entry updated successfully.');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JournalEntry $journalEntry)
    {
        $journalEntry->delete();

        return redirect()->route("accounting.journal-entries.index");
    }
}
