<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobApplicationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_applications')->insert([
            [
                'job_id' => 1, // Assuming the job ID 1 exists
                'user_id' => 2, // Assuming you have a user with ID 2
                'applicant_name' => 'John Doe',
                'applicant_email' => 'johndoe@example.com',
                'phone_number' => '555-0123',
                'linkedin_profile' => 'https://www.linkedin.com/in/johndoe',
                'portfolio_url' => 'https://johndoe.com',
                'availability_date' => now()->addDays(15),
                'skills' => json_encode(['JavaScript', 'PHP', 'React']), // Encode skills as JSON
                'references' => json_encode(['Jane Smith - 555-0456']), // Encode references as JSON
                'source' => json_encode(['Jane Smith - 555-0456']),
                'cover_letter' => json_encode('I am excited to apply for the Software Engineer position...'), // Encode cover letter as JSON
                'resume_path' => 'resumes/johndoe_resume.pdf', // Assuming you handle file uploads
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more sample applications as needed
        ]);
        
    }
}
