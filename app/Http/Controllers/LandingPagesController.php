<?php

namespace App\Http\Controllers;

use App\Models\LandingPages;
use App\Models\LandingPageSection;
use Illuminate\Http\Request;

class LandingPagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show($slug)
    // {
    //     $landingPage = LandingPages::where('slug', $slug)->first();
    
    //     if (!$landingPage) {
    //         return response()->json(['error' => 'Landing page not found.'], 404);
    //     }
    
    //     // Retrieve the landing page sections with the correct foreign key
    //     $sections = LandingPageSection::where('landing_page_id', $landingPage->id)->get();
    
    //     return response()->json([
    //         'landing_page' => $landingPage,
    //         'sections' => $sections,
    //     ]);
    // }

     public function show($slug)
    {
        $landingPage = LandingPages::where('slug', $slug)->first();

        if (!$landingPage) {
            return response()->json(['error' => 'Landing page not found.'], 404);
        }

        $sections = LandingPageSection::with('section.contentBlocks')
            ->where('landing_page_id', $landingPage->id)
            ->get();

        return response()->json([
            'landing_page' => $landingPage,
            'sections' => $sections,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LandingPages $landingPages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LandingPages $landingPages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LandingPages $landingPages)
    {
        //
    }
}
