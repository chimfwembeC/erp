<?php

namespace App\Http\Controllers\SalesAndOrders;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
       /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("SalesAndOrders/Orders/Index", [
            'orders' => Order::with(['orderItems', 'product', 'customer'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("SalesAndOrders/Orders/Create", [
            'users' => User::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'total_price' => 'required',
            'status' => 'required',
        ]);

        Order::create([
            'user_id' => $validated['user_id'] ? $validated['user_id'] : auth()->user()->id,
            'total_price' => $validated['total_price'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('sale-orders.orders.index')->with('success', 'order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render("SalesAndOrders/Orders/Show", [
            'order' => $order->load(['customer','orderItems']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render("SalesAndOrders/Orders/Edit", [
            'order' => $order->load('orderItems'),
            'users' => User::latest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'total_price' => 'required',
            'status' => 'required',
        ]);

        $order->update([
            'user_id' => $validated['user_id'] ? $validated['user_id'] : auth()->user()->id,
            'total_price' => $validated['total_price'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('sale-orders.orders.index')->with('success', 'order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
        $order->delete();
        return redirect()->route('sale-orders.orders.index')->with('success', 'order deleted successfully.');
    }
}
