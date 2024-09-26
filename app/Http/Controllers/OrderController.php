<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $orders = Order::latest()->get();

        return Inertia::render("Orders/Index",[
            'orders' => $orders,
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
        //
        $validatedData = $request->validate([
            // 'user_id' => "",
            'total_price' => "required|string",
            'status' => "string",
            'product_id' => 'required',
            'quantity' => 'required|numeric|min:1',
            'price' =>  'required|numeric|min:1',
        ]);

        $order = Order::create([
            'total_price' => $validatedData['total_price'],
            'user_id' => auth()->user()->id,
            'status' => 'pending',
        ]);

        OrderItem::create([
            'product_id' => $validatedData['product_id'],
            'order_id' => $order->id,
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
        ]);

        return redirect()->route('orders.index')->with('success', 'order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
        return Inertia::render("Orders/Show",[
            'order' => $order->load(['orderItems','user'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
        return Inertia::render("Orders/Edit",[
            'order' => $order->load(['orderItems'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
        $validatedData = $request->validate([
            // 'user_id' => "",
            'total_price' => "required|string",
            'status' => "string",
            'product_id' => 'required',
            'quantity' => 'required|numeric|min:1',
            'price' =>  'required|numeric|min:1',
        ]);

        $order->update([
            'total_price' => $validatedData['total_price'],
            // 'user_id' => auth()->user()->id,
            'status' => $validatedData['status'],
        ]);

        $orderItems = OrderItem::where('order_id', $order->id)->first();

        $orderItems->update([
            'product_id' => $validatedData['product_id'],
            'order_id' => $order->id,
            'price' => $validatedData['price'],
            'quantity' => $validatedData['quantity'],
        ]);

        return redirect()->route('orders.index')->with('success', 'order updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'order deleted successfully.');

    }
}
