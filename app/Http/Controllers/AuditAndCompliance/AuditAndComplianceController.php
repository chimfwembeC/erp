<?php

namespace App\Http\Controllers\AuditAndCompliance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditAndComplianceController extends Controller
{
    public function index()
    {
        return Inertia::render("AuditAndCompliances/Index");
    }
}
