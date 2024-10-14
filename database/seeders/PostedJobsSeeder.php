<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostedJobsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posted_jobs')->insert([
            [
                'title' => 'Software Engineer',
                'description' => 'Develop and maintain web applications.',
                'location' => 'Remote',
                'salary' => 75000.00,
                'job_type' => 'full-time',
                'deadline' => now()->addDays(30),
                'employer_id' => 1, // Assuming you have an employer with ID 1
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Product Manager',
                'description' => 'Lead product development and strategy.',
                'location' => 'On-site',
                'salary' => 90000.00,
                'job_type' => 'full-time',
                'deadline' => now()->addDays(30),
                'employer_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample jobs as needed
        ]);
    }
}
