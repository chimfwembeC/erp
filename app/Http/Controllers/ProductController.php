<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::with(['warehouses'])->latest()->get();

        return Inertia::render("Products/Index",[
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Products/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:100',
            'description' => 'nullable|max:100',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
        ]);

        Product::create([
            'name' => $validateData['name'],
            'description' => $validateData['description'],
            'price' => $validateData['price'],
            'stock' => $validateData['stock'],
        ]);

        return redirect()->route('products.index')->with('success', 'product created successfully.');        
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render("Products/Show",[
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render("Products/Edit",[
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validateData = $request->validate([
            'name' => 'max:100',
            'description' => 'nullable|max:100',
            'price' => 'numeric',
            'stock' => 'numeric',
        ]);

        $product->update([
            'name' => $validateData['name'],
            'description' => $validateData['description'],
            'price' => $validateData['price'],
            'stock' => $validateData['stock'],
        ]);

        return redirect()->route('products.index')->with('success', 'product updated successfully.');        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'product deleted successfully.');                
    }
}
