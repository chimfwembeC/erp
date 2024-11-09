<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\JournalEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
            // 'journalEntries' => JournalEntry::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 'reference', 'description', 'total_debit', 'total_credit', 'entry_date'
        $request->validate([
            'reference' => 'date|required',
            'description' => 'string|required',
            'total_debit' => 'numeric|required',
            'total_credit' => 'string|required',
            'entry_date' => 'date|required',
        ]);

        $entryDate = Carbon::parse($request->entry_date)->format('Y-m-d H:i:s');

        $journalEntry = JournalEntry::create(array_merge($request->all(),[
            'entry_date' => $entryDate,
        ]));

        return redirect()->route("accounting.journal-entries.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(JournalEntry $journalEntry)
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Create",[
            'journalEntry' => $journalEntry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JournalEntry $journalEntry)
    {
        return Inertia::render("AccountingAndFinance/JournalEntries/Create",[
            'journalEntry' => $journalEntry,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JournalEntry $journalEntry)
    {
         $request->validate([
            'reference' => 'date|required',
            'description' => 'string|required',
            'total_debit' => 'numeric|required',
            'total_credit' => 'string|required',
            'entry_date' => 'date|required',
        ]);

        $entryDate = Carbon::parse($request->entry_date)->format('Y-m-d H:i:s');

        $journalEntry->update(array_merge($request->all(),[
            'entry_date' => $entryDate,
        ]));

        return redirect()->route("accounting.journal-entries.index");
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
