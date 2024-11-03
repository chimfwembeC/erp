<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Budget;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("AccountingAndFinance/Budgets/Index", [
            'budgets' => Budget::with(['account'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("AccountingAndFinance/Budgets/Create",[
            'accounts' => Account::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_id' => 'required|integer',
            'budgeted_amount' => 'required|numeric',
            'actual_amount' => 'nullable|numeric',
            'fiscal_year' => 'required|string',
        ]);

        Budget::create($validated);

        return redirect()->route('accounting.budgets.index')->with('success', 'Budget created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget)
    {        

        return Inertia::render("AccountingAndFinance/Budgets/Show", [
            'budget' => $budget->load(['account']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Budget $budget)
    {        
        return Inertia::render("AccountingAndFinance/Budgets/Edit", [
            'budget' => $budget,
            'accounts' => Account::all(),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Budget $budget)
    {
        $validated = $request->validate([
            'account_id' => 'required|integer',
            'budgeted_amount' => 'required|numeric',
            'actual_amount' => 'nullable|numeric',
            'fiscal_year' => 'required|string',
        ]);
        
        $budget->update($validated);

        return redirect()->route('accounting.budgets.index')->with('success', 'Budget updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget)
    {        
        $budget->delete();

        return redirect()->route('accounting.budgets.index')->with('success', 'Budget deleted successfully.');
    }
}
