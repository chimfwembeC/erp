<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function updateStatus(Request $request, $projectId, Task $task)
    {
        // Validate the status input
        $request->validate([
            'status' => 'required|string|in:pending,in_progress,completed', // Adjust according to your status values
        ]);

        // Update the task status
        $task->status = $request->status;
        $task->save();

        return response()->json([
            'message' => 'Task status updated successfully.',
            'task' => $task
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
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(null, 204);
    }
}
