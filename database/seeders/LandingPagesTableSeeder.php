<?php

namespace Database\Seeders;

use App\Models\LandingPages;
use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LandingPagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Get template
         $defaultTemplate = Template::where('slug', 'default-landing-page')->first();

         LandingPages::create([
             'template_id' => $defaultTemplate->id,
             'title' => 'Welcome to Our ERP Solution',
             'slug' => 'erp-landing',
             'custom_data' => json_encode([
                 'header_text' => 'Revolutionize Your Business'
             ]),
             'is_published' => true
         ]);
    }
}
