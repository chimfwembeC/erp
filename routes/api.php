<?php

use App\Http\Controllers\ContentBlockController;
use App\Http\Controllers\HRM\JobController;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\TemplateController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/jobs/{id}', [JobController::class, 'show'])->name('hrm.jobs.show');

Route::apiResource('templates', TemplateController::class);
// Route::apiResource('sections', SectionController::class);
// Route::apiResource('content-blocks', ContentBlockController::class);
// Route::apiResource('landing-pages', LandingPageController::class);
Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);

Route::get('/quote', function () {
    return response()->json([
        'quote' => Inspiring::plainQuote(),
    ]);
});
