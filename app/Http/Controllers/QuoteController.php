<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quotes = Quote::latest()->get();

        return Inertia::render("Quotes/Index",[
            'quotes' => $quotes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'total_estimated' => 'string', 	
            'status' => 'string'
        ]);

        Quote::create([
            'total_estimated' => $validateData['total_estimated'],
            'status' => $validateData['status'],
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('quotes.index')->with('success', 'quote created successfully.');        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote)
    {
        return Inertia::render("Quotes/Show",[
            'quote' => $quote
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quote $quote)
    {
        return Inertia::render("Quotes/Edit",[
            'quote' => $quote
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote)
    {
        $validateData = $request->validate([
            'total_estimated' => 'string', 	
            'status' => 'string'
        ]);

        Quote::create([
            'total_estimated' => $validateData['total_estimated'],
            'status' => $validateData['status'],
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('quotes.index')->with('success', 'quote created successfully.');        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote)
    {
        $quote->delete();

        return redirect()->route('quotes.index')->with('success', 'quote created successfully.');        
    }
}
