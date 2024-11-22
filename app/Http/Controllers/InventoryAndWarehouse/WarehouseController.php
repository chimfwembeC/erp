<?php

namespace App\Http\Controllers\InventoryAndWarehouse;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $warehouses = Warehouse::all();

        return Inertia::render("InventoryAndWarehouses/Warehouses/Index",[
            'warehouses' => $warehouses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("InventoryAndWarehouses/Warehouses/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
        ]);

        Warehouse::create([
            'name' => $validateData['name'],
            'location' => $validateData['location'],
        ]);

        return redirect()->route('inventory.warehouses.index')->with('success', 'warehouse deleted successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Warehouse $warehouse)
    {
        return Inertia::render("InventoryAndWarehouses/Warehouses/Show",[
            'warehouse' => $warehouse
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Warehouse $warehouse)
    {
        return Inertia::render("InventoryAndWarehouses/Warehouses/Edit",[
            'warehouse' => $warehouse
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Warehouse $warehouse)
    {
        $validateData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
        ]);

        $warehouse->update([
            'name' => $validateData['name'],
            'location' => $validateData['location'],
        ]);

        return redirect()->route('inventory.warehouses.index')->with('success', 'warehouse deleted successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Warehouse $warehouse)
    {
        //
        $warehouse->delete();

        return redirect()->route('inventory.warehouses.index')->with('success', 'warehouse deleted successfully.');
    }
}
