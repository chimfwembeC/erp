<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\PostedJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    // Display a listing of the job applications
    public function index()
    {
        // Fetch all job applications, possibly with relationships if needed
        $jobApplications = JobApplication::with(['postedJob', 'applicant'])->latest()->get();

        return Inertia::render("HRM/Jobs/JobApplications/Index", [
            'jobApplications' => $jobApplications,
        ]);
    }

    // Show the form for creating a new job application
    public function create()
    {

        return Inertia::render("HRM/Jobs/JobApplications/Create", [
            'users' => User::latest()->get(),
            'jobs' => PostedJob::latest()->get(),
        ]);
    }

    // Store a newly created job application in storage
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'job_id' => 'required|exists:posted_jobs,id',
            'user_id' => 'required|exists:users,id',
            'applicant_name' => 'required|string|max:255',
            'applicant_email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:20',
            'linkedin_profile' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|string|max:255',
            'availability_date' => 'nullable|date',
            'skills' => 'nullable|string',
            'references' => 'nullable|string',
            'sources' => 'nullable|string|max:255',
            'cover_letter' => 'nullable|string',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048', // Adjust based on your requirements
        ]);

        // Handle file upload for the resume
        $resumePath = $request->file('resume')->store('resumes', 'public');
        $validatedData['resume_path'] = '/'.$resumePath;
        // $validatedData['skills'] = json_encode($validatedData['skills']);
        // $validatedData['references'] = json_encode($validatedData['references']);
        // $validatedData['sources'] = json_encode($validatedData['sources']);
        // $validatedData['cover_letter'] = json_encode($validatedData['cover_letter']);

        // Create a new job application
        JobApplication::create(array_merge($validatedData, [
            'resume_path' => '/'.$resumePath,
            'status' => 'pending', // Default status
        ]));

        return redirect()->route('hrm.job-applications.index')->with('success', 'Application submitted successfully.');
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
            'jobApplication' => $jobApplication,
            'users' => User::latest()->get(),
            'jobs' => PostedJob::latest()->get(),
        ]);
    }

    // Update the specified job application in storage
    public function update(Request $request, JobApplication $jobApplication)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'status' => 'nullable|string|in:pending,interviewed,accepted,rejected',
            'job_id' => 'sometimes|required|exists:jobs,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'applicant_name' => 'sometimes|required|string|max:255',
            'applicant_email' => 'sometimes|required|email|max:255',
            'phone_number' => 'sometimes|nullable|string|max:20',
            'linkedin_profile' => 'sometimes|nullable|string|max:255',
            'portfolio_url' => 'sometimes|nullable|string|max:255',
            'availability_date' => 'sometimes|nullable|date',
            'skills' => 'sometimes|nullable|json',
            'references' => 'sometimes|nullable|json',
            'source' => 'sometimes|nullable|json|max:255',
            'cover_letter' => 'sometimes|nullable|string',
            'resume' => 'sometimes|file|mimes:pdf,doc,docx|max:2048',
        ]);
    
        // Handle file upload for the resume if it's provided
        if ($request->hasFile('resume')) {
            // Delete the old resume if it exists
            if ($jobApplication->resume && Storage::exists($jobApplication->resume)) {
                Storage::delete($jobApplication->resume);
            }
            // Store the new resume file
            $validatedData['resume'] = $request->file('resume')->store('resumes');
        }
    
        // Update job application with validated data
        $jobApplication->update($validatedData);
    
        return redirect()->route('hrm.job-applications.index')->with('success', 'Application submitted successfully.');        
    }
    



    // Remove the specified job application from storage
    public function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();

        return redirect()->route('hrm.job-applications.index')->with('success', 'Application deleted successfully.');
    }
}
