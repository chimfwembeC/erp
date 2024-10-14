<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\PostedJob;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    // Display a listing of the posted jobs
    public function index()
    {
        $jobs = PostedJob::latest()->get();

        return Inertia::render("HRM/Jobs/App", [
            'jobs' => $jobs,
        ]);
    }

    // Show the form for creating a new job
    public function create()
    {
        return Inertia::render("HRM/Jobs/Create");
    }

    // Store a newly created job in storage
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'salary' => 'nullable|numeric',
            'job_type' => 'required|in:full-time,part-time,contract,internship',
            'deadline' => 'nullable|date',
        ]);

        // Create a new posted job
        PostedJob::create(array_merge($validatedData, [
            'employer_id' => auth()->id(), // Assuming the user is logged in and is the employer
        ]));

        return redirect()->route('hrm.jobs.index')->with('success', 'Job posted successfully.');
    }

    // Display the specified job
    public function show($id)
    {
        $postedJob = PostedJob::with(['employer'])->find($id);

        return response()->json($postedJob);
    }

    // Show the form for editing the specified job
    public function edit($id)
    {
        $postedJob = PostedJob::with(['employer'])->find($id);

        return Inertia::render("HRM/Jobs/Edit", [
            'job' => $postedJob,
        ]);
    }

    // Update the specified job in storage
    public function update(Request $request, PostedJob $postedJob)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string|max:255',
            'salary' => 'nullable|numeric',
            'job_type' => 'required|in:full-time,part-time,contract,internship',
            'deadline' => 'nullable|date',
        ]);

        // Update the posted job
        $postedJob->update($validatedData);

        return redirect()->route('hrm.index')->with('success', 'Job updated successfully.');
    }

    // Remove the specified job from storage
    public function destroy(PostedJob $postedJob)
    {
        $postedJob->delete();

        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }
}
