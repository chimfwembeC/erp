<?php

namespace App\Http\Controllers;

use App\Models\LandingPages;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function savePage(Request $request)
    {
        $request->validate([
            'html' => 'required',
            'css' => 'required',
        ]);

        // Save the page to the database
        $page = LandingPages::create([
            'html' => $request->html,
            'css' => $request->css,
        ]);

        return response()->json(['success' => true, 'page_id' => $page->id]);
    }

    public function getPage($id)
    {
        $page = LandingPages::findOrFail($id);

        return response()->json([
            'html' => $page->html,
            'css' => $page->css,
        ]);
    }
}
