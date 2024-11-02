<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountingController extends Controller
{
    public function index()
    {
        return Inertia::render("AccountingAndFinance/Index",[

        ]);
    }
}
