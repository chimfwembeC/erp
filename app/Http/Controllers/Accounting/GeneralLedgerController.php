<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\GeneralLedger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralLedgerController extends Controller
{
    // List all ledger entries
    public function index()
    {
        $entries = GeneralLedger::with('account', 'user')->get();
        return Inertia::render("AccountingAndFinance/GeneralLedgers/Index", [
            'entries' => $entries,
        ]);
    }

    public function create()
    {
        return Inertia::render("AccountingAndFinance/GeneralLedgers/Create", [
            'accounts' => Account::all(),
        ]);
    }

    // Create a ledger entry (double-entry)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_id' => 'required|exists:accounts,id',
            // 'user_id' => 'required|exists:users,id',
            'debit' => 'nullable|numeric',
            'credit' => 'nullable|numeric',
            'description' => 'required|string',
            // 'transaction_date' => 'required|date',
        ]);

        // Make sure either debit or credit is provided, but not both
        if (!$validated['debit'] && !$validated['credit']) {
            return response()->json(['message' => 'Either debit or credit is required'], 422);
        }

        $entry = GeneralLedger::create(array_merge($validated,[
            'user_id' => auth()->user()->id,
            'transaction_date' => Carbon::parse(now()),
        ]));
        return redirect()->route('accounting.general-ledgers.index'); // Return the created entry with a 201 status
    }

    // Show a single ledger entry
    public function show(GeneralLedger $generalLedger)
    {
        // $entry = GeneralLedger::with('account', 'user')->findOrFail($id);
        return Inertia::render("AccountingAndFinance/GeneralLedgers/Show", [
            'entry' => $generalLedger,
        ]);
    }

    // edit a single ledger entry
    public function edit(GeneralLedger $generalLedger)
    {
        // $entry = GeneralLedger::with('account', 'user')->findOrFail($id);
        return Inertia::render("AccountingAndFinance/GeneralLedgers/Edit", [
            'entry' => $generalLedger,
            'accounts' => Account::latest()->get(),
        ]);
    }

    // Update a ledger entry
    public function update(Request $request, $id)
    {
        $entry = GeneralLedger::findOrFail($id);

        $validated = $request->validate([
            'account_id' => 'sometimes|required|exists:accounts,id',
            // 'user_id' => 'sometimes|required|exists:users,id',
            'debit' => 'nullable|numeric',
            'credit' => 'nullable|numeric',
            'description' => 'sometimes|required|string',
            // 'transaction_date' => 'sometimes|required|date',
        ]);

        // Make sure either debit or credit is provided, but not both
        if (empty($validated['debit']) && empty($validated['credit'])) {
            return response()->json(['message' => 'Either debit or credit is required'], 422);
        }

        $entry->update(array_merge($validated,[
            'user_id' => auth()->user()->id,
        ]));

        return redirect()->route('accounting.general-ledgers.index');
    }

    // Delete a ledger entry
    public function destroy(GeneralLedger $generalLedger)
    {
        // $entry = GeneralLedger::findOrFail($id);
        $generalLedger->delete();

        return redirect()->route('accounting.general-ledgers.index');
    }
}
