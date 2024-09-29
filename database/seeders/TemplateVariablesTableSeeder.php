<?php

namespace Database\Seeders;

use App\Models\Template;
use App\Models\TemplateVariable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateVariablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Get the template
           $defaultTemplate = Template::where('slug', 'default-landing-page')->first();

           // Add dynamic variables (CSS colors, text values, etc.)
           TemplateVariable::create([
               'template_id' => $defaultTemplate->id,
               'key' => 'primary_color',
               'value' => '#3490dc'
           ]);
   
           TemplateVariable::create([
               'template_id' => $defaultTemplate->id,
               'key' => 'secondary_color',
               'value' => '#ffed4a'
           ]);
    }
}
