<?php

namespace App\Http\Controllers\InventoryAndWarehouse;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryMovementController extends Controller
{
    public function index()
    {
        return Inertia::render("InventoryAndWarehouses/InventoryMovements/Index",[
            'inventoryMovements' => InventoryMovement::with(['product','warehouse'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render("InventoryAndWarehouses/InventoryMovements/Create",[
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
           'movement_type' => 'required|string',
        ]);

        InventoryMovement::create($validated);

        return redirect()->route('inventory.inventory_movements.index');
    }

    public function show(InventoryMovement $inventoryMovement)
    {
        return Inertia::render("InventoryAndWarehouses/InventoryMovements/Show",[
            'inventoryMovement' => $inventoryMovement->load(['warehouse','product']),
        ]);
    }

    public function edit(InventoryMovement $inventoryMovement)
    {
        return Inertia::render("InventoryAndWarehouses/InventoryMovements/Edit",[
            'inventoryMovement' => $inventoryMovement,
            'products' => Product::latest()->get(),
            'warehouses' => Warehouse::latest()->get(),
        ]);
    }

    public function update(Request $request, InventoryMovement $inventoryMovement)
    {
        $validated = $request->validate([
           'product_id' => 'required|numeric',
           'warehouse_id' => 'required|numeric',
           'quantity' => 'required',
           'movement_type' => 'required|string',
        ]);

        $inventoryMovement->update($validated);

        return redirect()->route('inventory.inventory_movements.index');
    }

    public function destroy(InventoryMovement $inventoryMovement)
    {

        $inventoryMovement->delete();

        return redirect()->route('inventory.inventory_movements.index')->withErrors('Inventory movement was deleted successfully');
    }
}
