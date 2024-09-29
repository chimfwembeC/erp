<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MediaTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Get template and media
          $defaultTemplate = Template::where('slug', 'default-landing-page')->first();
          $mediaImage = Media::where('type', 'image')->first();
          
          // Attach media to the template
          $defaultTemplate->media()->attach($mediaImage->id);
    }
}
