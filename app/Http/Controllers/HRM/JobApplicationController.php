<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\PostedJob;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    // Display a listing of the job applications
    public function index()
    {
        // Fetch all job applications, possibly with relationships if needed
        $jobApplications = JobApplication::with(['postedJob', 'applicant'])->latest()->get();

        return Inertia::render("HRM/Jobs/JobApplications/App", [
            'jobApplications' => $jobApplications,
        ]);
    }

    // Show the form for creating a new job application
    public function create($jobId)
    {
        // Fetch the job for which the application is being made
        $job = PostedJob::findOrFail($jobId);

        return Inertia::render("HRM/Jobs/JobApplications/Create", [
            'job' => $job,
        ]);
    }

    // Store a newly created job application in storage
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'posted_job_id' => 'required|exists:posted_jobs,id',
            'user_id' => 'required|exists:users,id',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048', // Allow only specific file types
            'cover_letter' => 'nullable|string',
        ]);

        // Handle file upload for the resume
        $resumePath = $request->file('resume')->store('resumes', 'public');

        // Create a new job application
        JobApplication::create(array_merge($validatedData, [
            'resume' => $resumePath,
            'status' => 'pending', // Set the default status for new applications
        ]));

        return redirect()->route('job-applications.index')->with('success', 'Application submitted successfully.');
    }

    // Display the specified job application
    public function show(JobApplication $jobApplication)
    {
        return Inertia::render("HRM/Jobs/JobApplications/Show", [
            'jobApplication' => $jobApplication->load(['postedJob', 'applicant']),
        ]);
    }

    // Show the form for editing the specified job application
    public function edit(JobApplication $jobApplication)
    {
        return Inertia::render("HRM/Jobs/JobApplications/Edit", [
            'jobApplication' => $jobApplication->load(['postedJob', 'applicant']),
        ]);
    }

    // Update the specified job application in storage
    public function update(Request $request, JobApplication $jobApplication)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        // Update the job application
        $jobApplication->update($validatedData);

        return redirect()->route('job-applications.index')->with('success', 'Application status updated successfully.');
    }

    // Remove the specified job application from storage
    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return redirect()->route('job-applications.index')->with('success', 'Application deleted successfully.');
    }
}
