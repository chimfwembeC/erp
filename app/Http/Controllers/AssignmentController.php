<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $assignment = Assignment::create($request->all());
        return response()->json($assignment, 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Assignment::destroy($id);
        return response()->json(null, 204);
    }
}
