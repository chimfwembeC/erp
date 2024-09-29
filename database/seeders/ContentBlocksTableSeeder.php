<?php

namespace Database\Seeders;

use App\Models\ContentBlock;
use App\Models\Sections;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContentBlocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Get header section
          $headerSection = Sections::where('name', 'Header Section')->first();

          // Add content blocks to the header section
          ContentBlock::create([
              'section_id' => $headerSection->id,
              'content_type' => 'text',
              'content' => 'Welcome to Our ERP Solution',
              'position' => 1
          ]);
  
          ContentBlock::create([
              'section_id' => $headerSection->id,
              'content_type' => 'button',
              'content' => 'Get Started',
              'position' => 2
          ]);
  
          // Features Section
          $featuresSection = Sections::where('name', 'Features Section')->first();
  
          ContentBlock::create([
              'section_id' => $featuresSection->id,
              'content_type' => 'text',
              'content' => 'Our ERP Solution offers a wide range of features designed to optimize your business processes.',
              'position' => 1
          ]);
    }
}
