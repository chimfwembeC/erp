<?php

namespace App\Http\Controllers\SalesAndOrders;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'order_id' => 'required',
            'product_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
        ]);

        OrderItem::create($validated);
        return redirect()->route('sale-orders.orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderItem $orderItem)
    {
        $validated = $request->validate([
            'order_id' => 'required',
            'product_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',
        ]);

        $orderItem->update($validated);

        return redirect()->route('sale-orders.orders.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();

        return redirect()->route('sale-orders.orders.index');
    }
}
