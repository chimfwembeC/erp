<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Template::create([
            'name' => 'Default Landing Page Template',
            'slug' => 'default-landing-page',
            'layout' => 'default-layout', // this can be a JSON structure or string representing the layout
            'is_active' => true
        ]);

        Template::create([
            'name' => 'Modern Business Template',
            'slug' => 'modern-business',
            'layout' => 'modern-layout',
            'is_active' => true
        ]);
    }
}
