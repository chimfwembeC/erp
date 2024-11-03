<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Tax;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class TaxController extends Controller
{
    public function index()
    {
        return Inertia::render("AccountingAndFinance/Taxes/Index", [
            'taxes' => Tax::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render("AccountingAndFinance/Taxes/Create");
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'tax_name' => 'required|string|max:255',
            'rate' => 'required|numeric|min:0',
            'tax_type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Create a new tax record
        Tax::create($request->only(['tax_name', 'rate', 'tax_type']));

        return redirect()->route('accounting.taxes.index')->with('success', 'Tax created successfully.');
    }

    public function edit(Tax $tax)
    {
        return Inertia::render("AccountingAndFinance/Taxes/Edit", [
            'tax' => $tax,
        ]);
    }

    public function update(Request $request, Tax $tax)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'tax_name' => 'required|string|max:255',
            'rate' => 'required|numeric|min:0',
            'tax_type' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Update the tax record
        $tax->update($request->only(['tax_name', 'rate', 'tax_type']));

        return redirect()->route('accounting.taxes.index')->with('success', 'Tax updated successfully.');
    }

    public function destroy(Tax $tax)
    {
        // Delete the tax record
        $tax->delete();

        return redirect()->route('accounting.taxes.index')->with('success', 'Tax deleted successfully.');
    }
}
