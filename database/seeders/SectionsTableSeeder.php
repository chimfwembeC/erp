<?php

namespace Database\Seeders;

use App\Models\Sections;
use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Get default template
          $defaultTemplate = Template::where('slug', 'default-landing-page')->first();

          // Creating sections for the default template
          Sections::create([
              'template_id' => $defaultTemplate->id,
              'name' => 'Header Section',
              'position' => 1,
              'type' => 'header'
          ]);
  
          Sections::create([
              'template_id' => $defaultTemplate->id,
              'name' => 'Features Section',
              'position' => 2,
              'type' => 'features'
          ]);
  
          Sections::create([
              'template_id' => $defaultTemplate->id,
              'name' => 'Footer Section',
              'position' => 3,
              'type' => 'footer'
          ]);
    }
}
