<?php

namespace App\Http\Controllers\InventoryAndWarehouse;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductWarehouse;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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

        return Inertia::render("InventoryAndWarehouses/Products/Index",[
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("InventoryAndWarehouses/Products/Create",[
            'warehouses' => Warehouse::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:100',
            'sku' => 'required|max:100|unique:products',
            'description' => 'nullable|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'stock' => 'required|numeric',
            'warehouse_id' => 'nullable|numeric',
        ]);

        $product = Product::create([
            'name' => $validateData['name'],
            'sku' => $validateData['sku'],
            'quantity' => $validateData['quantity'],
            'description' => $validateData['description'],
            'price' => $validateData['price'],
            'stock' => $validateData['stock'],
        ]);

        if(isset($validateData['warehouse_id']))
        {
            ProductWarehouse::create([
                'product_id' => $product->id,
                'warehouse_id' => $validateData['warehouse_id'],
                'quantity' => $validateData['quantity'],
            ]);
        }

        return redirect()->route('inventory.products.index')->with('success', 'product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render("InventoryAndWarehouses/Products/Show",[
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render("InventoryAndWarehouses/Products/Edit",[
            'product' => $product,
            'warehouses' => Warehouse::latest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validateData = $request->validate([
            'name' => 'max:100',
            'sku' => [
                'max:100',
                Rule::unique('products', 'sku')->ignore($product->id), // Exclude current product's ID
            ],
            'description' => 'nullable',
            'price' => 'numeric',
            'quantity' => 'required|numeric',
            'stock' => 'numeric',
            'warehouse_id' => 'nullable',
        ]);


        $product->update([
            'name' => $validateData['name'],
            'sku' => $validateData['sku'],
            'quantity' => $validateData['quantity'],
            'description' => $validateData['description'],
            'price' => $validateData['price'],
            'stock' => $validateData['stock'],
        ]);

        $productWarehouse = $product->warehouses();

        if(isset($validateData['warehouse_id']))
        {
            $productWarehouse->update([
                'product_id' => $product->id,
                'warehouse_id' => $validateData['warehouse_id'],
                'quantity' => $validateData['quantity'],
            ]);
        }

        return redirect()->route('inventory.products.index')->with('success', 'product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('inventory.products.index')->with('success', 'product deleted successfully.');
    }
}
