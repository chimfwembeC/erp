<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            [
                'name' => 'Project Management Module',
                'description' => 'A comprehensive project management module for ERP.',
                'start_date' => '2025-01-01',
                'end_date' => '2025-12-31',
                'owner_id' => 1, // Assuming user with ID 1 is the owner
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Milestones Module',
                'description' => 'A detailed milestones tracking system for projects.',
                'start_date' => '2025-02-01',
                'end_date' => '2025-08-01',
                'owner_id' => 2, // Assuming user with ID 2 is the owner
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tasks Management System',
                'description' => 'Task management system with real-time updates.',
                'start_date' => '2025-03-01',
                'end_date' => '2025-09-30',
                'owner_id' => 3, // Assuming user with ID 3 is the owner
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into the database
        DB::table('projects')->insert($projects);
    }
}
