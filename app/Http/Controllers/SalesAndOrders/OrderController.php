<?php

namespace App\Http\Controllers\SalesAndOrders;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
            'order' => $order->load(['customer','orderItems.product']),
            'products' => Product::latest()->get(),
        ]);
    }


    public function addItemsToOrder(Request $request, $orderId)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'order_items' => 'required|array', // Ensure 'order_items' is an array
            'order_items.*.product_id' => 'required|exists:products,id', // Validate product IDs
            'order_items.*.quantity' => 'required|integer|min:1', // Validate quantity
            'order_items.*.price' => 'required|numeric|min:0', // Validate price
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the order by ID
        $order = Order::findOrFail($orderId);

        // Loop through the order items and create or update them
        foreach ($request->order_items as $item) {
            $order->orderItems()->updateOrCreate(
                ['product_id' => $item['product_id']], // Match existing items by product_id
                ['quantity' => $item['quantity'], 'price' => $item['price']] // Update or create with these values
            );
        }

        // Load the updated order with items and their product details
        return response()->json([
            'order' => $order->load('orderItems.product'),
        ], 200);
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
        $order->orderItems()->delete();
        $order->delete();

        return redirect()->route('sale-orders.orders.index')->with('success', 'order deleted successfully.');
    }
}
