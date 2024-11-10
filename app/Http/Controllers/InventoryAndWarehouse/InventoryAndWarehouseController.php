<?php

namespace App\Http\Controllers\InventoryAndWarehouse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryAndWarehouseController extends Controller
{
    public function index()
    {
        return Inertia::render("InventoryAndWarehouses/Index");
    }
}
