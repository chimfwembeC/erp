<?php

use App\Http\Controllers\HRM\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/jobs/{id}', [JobController::class, 'show'])->name('hrm.jobs.show');    

Route::apiResource('templates', TemplateController::class);
Route::apiResource('sections', SectionController::class);
Route::apiResource('content-blocks', ContentBlockController::class);
Route::apiResource('landing-pages', LandingPageController::class);
