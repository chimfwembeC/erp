<?php

namespace App\Http\Controllers\HRM;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HRMController extends Controller
{
    public function index()
    {
        return Inertia::render("HRM/Index");
    }
}
