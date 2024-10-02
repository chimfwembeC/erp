<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render("HRM/Jobs/JobApplications/Index",[
            'jobApplications' => [],
        ]);
    }
}
