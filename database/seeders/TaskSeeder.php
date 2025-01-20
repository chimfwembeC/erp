<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TaskSeeder extends Seeder
{
    public function run()
    {
        DB::table('tasks')->insert([
            [
                'project_id' => 1,
                'issue_id' => 1,
                'title' => 'Design database schema',
                'description' => 'Draft the initial database structure for the project.',
                'status' => 'pending',
                'assignee_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 1,
                'issue_id' => 1,
                'title' => 'Develop API endpoints',
                'description' => 'Create API routes for user authentication and CRUD operations.',
                'status' => 'in_progress',
                'assignee_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 2,
                'issue_id' => null,
                'title' => 'Set up CI/CD pipeline',
                'description' => 'Automate deployment and testing processes.',
                'status' => 'completed',
                'assignee_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 3,
                'issue_id' => 2,
                'title' => 'Implement role-based access control',
                'description' => 'Ensure only authorized users can access certain features.',
                'status' => 'in_progress',
                'assignee_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 3,
                'issue_id' => 3,
                'title' => 'Write unit tests',
                'description' => 'Write tests for API endpoints and core functionality.',
                'status' => 'pending',
                'assignee_id' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
