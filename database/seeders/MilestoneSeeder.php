<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class MilestoneSeeder extends Seeder
{
    public function run()
    {
        DB::table('milestones')->insert([
            [
                'project_id' => 1,
                'name' => 'Initial Setup',
                'description' => 'Complete the foundational setup for the project.',
                'due_date' => Carbon::now()->addDays(15),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 1,
                'name' => 'API Development',
                'description' => 'Develop and test the API endpoints.',
                'due_date' => Carbon::now()->addDays(30),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 2,
                'name' => 'UI Design',
                'description' => 'Finalize the user interface designs for the main pages.',
                'due_date' => Carbon::now()->addDays(20),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 2,
                'name' => 'Testing & QA',
                'description' => 'Perform rigorous testing and quality assurance.',
                'due_date' => Carbon::now()->addDays(45),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 3,
                'name' => 'Final Deployment',
                'description' => 'Prepare and deploy the final version of the application.',
                'due_date' => Carbon::now()->addDays(60),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
