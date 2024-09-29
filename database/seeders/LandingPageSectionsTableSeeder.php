<?php

namespace Database\Seeders;

use App\Models\LandingPages;
use App\Models\LandingPageSection;
use App\Models\Sections;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LandingPageSectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Get landing page and sections
           $landingPage = LandingPages::where('slug', 'erp-landing')->first();
           $headerSection = Sections::where('name', 'Header Section')->first();
   
           LandingPageSection::create([
               'landing_page_id' => $landingPage->id,
               'section_id' => $headerSection->id,
               'custom_data' => json_encode([
                   'custom_header_text' => 'Empowering Your Business'
               ])
           ]);
    }
}
