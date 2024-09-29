<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MediaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Media::create([
            'url' => 'https://example.com/hero-image.jpg',
            'type' => 'image'
        ]);

        Media::create([
            'url' => 'https://example.com/video.mp4',
            'type' => 'video'
        ]);
    }
}
