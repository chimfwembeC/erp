<?php

namespace App\Http\Controllers;

use App\Models\LandingPages;
use App\Models\LandingPageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LandingPagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all landing pages
        $landingPages = LandingPages::all();
        return response()->json($landingPages);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Typically, you would return a view for creating a new landing page
        // This could be a Blade view in a web application
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'template_id' => 'required|string',
            'title' => 'required|string|max:255',
            'is_published' => 'boolean',
            'html' => 'required|string',
            'css' => 'nullable|string',
        ]);

        // Create a new landing page
        $landingPage = LandingPages::create([
            'template_id' => $request->template_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'is_published' => $request->is_published,
            'html' => $request->html,
            'css' => $request->css,
        ]);

        return response()->json($landingPage, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $landingPage = LandingPages::where('slug', $slug)->first();

        if (!$landingPage) {
            return response()->json(['error' => 'Landing page not found.'], 404);
        }

        return response()->json([
            'landing_page' => $landingPage,            
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LandingPages $landingPages)
    {
        // Typically, you would return a view for editing the landing page
        // This could be a Blade view in a web application
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LandingPages $landingPages)
    {
        $request->validate([
            // 'template_id' => 'required|string',
            'title' => 'required|string|max:255',
            'is_published' => 'boolean',
            'content' => 'required|string',
            'css' => 'nullable|string',
        ]);

        // Update the landing page with the request data
        $landingPages->update([
            'template_id' => $request->template_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'is_published' => $request->is_published,
            'html' => $request->content,
            'css' => $request->css,
        ]);

        return response()->json($landingPages);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LandingPages $landingPages)
    {
        // Delete the landing page
        $landingPages->delete();
        return response()->json(['message' => 'Landing page deleted successfully.'], 204);
    }
}
