<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all purchase orders, possibly with pagination
        $purchaseOrders = PurchaseOrder::all(); // You can use paginate() if needed.
        
        return Inertia::render("AccountingAndFinance/PurchaseOrders/Index",[
            'purchaseOrders' => $purchaseOrders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("AccountingAndFinance/PurchaseOrders/Create",[
            'suppliers' => User::all()
            // 'suppliers' => User::where('role','supplier')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'supplier_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'order_date' => 'required|date',
            'delivery_date' => 'required|date',
            'status' => 'required|in:pending,completed,cancelled',
        ]);

        $deliveryDate = Carbon::parse($validated['delivery_date'])->format('Y-m-d H:i:s');
        $orderDate = Carbon::parse($validated['order_date'])->format('Y-m-d H:i:s');

        // Create the purchase order
        $purchaseOrder = PurchaseOrder::create(array_merge($validated,[
            'delivery_date' => $deliveryDate,
            'order_date' => $orderDate
        ]));

        // Redirect with success message
        return redirect()->route('accounting.purchase-orders.index')
                         ->with('success', 'Purchase Order created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchaseOrder $purchaseOrder)
    {
        return Inertia::render("AccountingAndFinance/PurchaseOrders/Show",[
            'purchaseOrder' => $purchaseOrder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchaseOrder $purchaseOrder)
    {
        return Inertia::render("AccountingAndFinance/PurchaseOrders/Edit",[
            'purchaseOrder' => $purchaseOrder,
            'suppliers' => User::all()
            // 'suppliers' => User::where('role','supplier')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'supplier_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'discount_amount' => 'required|numeric',
            'order_date' => 'required|date',
            'delivery_date' => 'required|date',
            'status' => 'required|in:pending,completed,cancelled',
        ]);

        $deliveryDate = Carbon::parse($validated['delivery_date'])->format('Y-m-d H:i:s');
        $orderDate = Carbon::parse($validated['order_date'])->format('Y-m-d H:i:s');
        // Update the purchase order
        $purchaseOrder->update(array_merge($validated,[
            'delivery_date' => $deliveryDate,
            'order_date' => $orderDate
        ]));

        // Redirect with success message
        return redirect()->route('accounting.purchase-orders.index')
                         ->with('success', 'Purchase Order updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseOrder $purchaseOrder)
    {
        // Delete the purchase order
        $purchaseOrder->delete();

        // Redirect with success message
        return redirect()->route('accounting.purchase-orders.index')
                         ->with('success', 'Purchase Order deleted successfully!');
    }
}
