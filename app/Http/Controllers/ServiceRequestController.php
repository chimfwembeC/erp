<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceRequests = ServiceRequest::latest()->get();

        return Inertia::render("ServiceRequests/Index",[
            'serviceRequests' => $serviceRequests
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("ServiceRequests/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'request_details' => 'required|max:255',
            'status' => 'string',
        ]);

        ServiceRequest::create([
            'request_details' => $validateData['request_details'],
            'status' => 'pending',
            'user_id' => auth()->user()->id
        ]);

        return redirect()->route('quotes.index')->with('success', 'service request created successfully.');        
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRequest $serviceRequest)
    {
        return Inertia::render("ServiceRequests/Show",[
            'serviceRequest' => $serviceRequest
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRequest $serviceRequest)
    {
        return Inertia::render("ServiceRequests/Edit",[
            'serviceRequest' => $serviceRequest
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRequest $serviceRequest)
    {
        $validateData = $request->validate([
            'request_details' => 'required|max:255',
            'status' => 'string',
        ]);

        ServiceRequest::create([
            'request_details' => $validateData['request_details'],
            'status' => $validateData['status'],            

        ]);

        return redirect()->route('quotes.index')->with('success', 'service request updated successfully.');        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $serviceRequest)
    {
        $serviceRequest->delete();

        return redirect()->route('quotes.index')->with('success', 'service request deleted successfully.');        
    }
}
