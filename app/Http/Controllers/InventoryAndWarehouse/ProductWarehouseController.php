<?php

namespace App\Http\Controllers\InventoryAndWarehouse;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductWarehouse;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductWarehouseController extends Controller
{
    public function index()
    {
        return Inertia::render("InventoryAndWarehouses/ProductWarehouses/Index",[
            'productWarehouses' => ProductWarehouse::with(['product', 'warehouse'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render("InventoryAndWarehouses/ProductWarehouses/Create",[
            'products' => Product::latest()->get(),
            'warehouses' => Warehouse::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|numeric',
            'warehouse_id' => 'required|numeric',
            'quantity' => 'required',
        ]);

        ProductWarehouse::create($validated);
        return redirect()->route('inventory.product-warehouses.index');
    }

    public function edit(ProductWarehouse $productWarehouse)
    {
        return Inertia::render("InventoryAndWarehouses/ProductWarehouses/Edit",[
            'productWarehouse' => $productWarehouse,
            'products' => Product::latest()->get(),
            'warehouses' => Warehouse::latest()->get(),
        ]);
    }

    public function update(Request $request, ProductWarehouse $productWarehouse)
    {
        $validated = $request->validate([
            'product_id' => 'required|numeric',
            'warehouse_id' => 'required|numeric',
            'quantity' => 'required',
        ]);

        $productWarehouse->update($validated);

        return redirect()->route('inventory.product-warehouses.index');
    }

    public function destroy(ProductWarehouse $productWarehouse)
    {

        $productWarehouse->delete();

        return redirect()->route('inventory.product-warehouses.index');
    }
}
