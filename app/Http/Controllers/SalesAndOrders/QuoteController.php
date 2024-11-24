<?php

namespace App\Http\Controllers\SalesAndOrders;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("SalesAndOrders/Quotes/Index",[
            'quotes' => Quote::with(['user'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("SalesAndOrders/Quotes/Create",[
            'users' => User::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //'user_id' ,'total_estimated' ,'status'
        $validated = $request->validate([
            'total_estimated' => 'required',
            'status' => 'required',
        ]);

        Quote::create(array_merge($validated,[
            'user_id' => auth()->user()->id,
        ]));

        return redirect()->route('salesAndOrders.quotes.index')->with('success', 'quote created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    {
        return Inertia::render("SalesAndOrders/Quotes/Show",[
            'quote' => $quote->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quote $quote)
    {
        return Inertia::render("SalesAndOrders/Quotes/Edit",[
            'quote' => $quote,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'total_estimated' => 'required',
            'status' => 'required',
        ]);

        $quote->update($validated);

        return redirect()->route('salesAndOrders.quotes.index')->with('success', 'quote updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return redirect()->route('salesAndOrders.quotes.index')->with('success', 'quote deleted successfully.');
    }
}
