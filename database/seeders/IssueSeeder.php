<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class IssueSeeder extends Seeder
{
    public function run()
    {
        DB::table('issues')->insert([
            [
                'project_id' => 1,
                'milestone_id' => 1,
                'title' => 'Fix login bug',
                'description' => 'Users cannot log in with valid credentials due to a session timeout.',
                'status' => 'open',
                'assignee_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 1,
                'milestone_id' => null,
                'title' => 'API timeout error',
                'description' => 'Certain API calls fail due to long response times from the server.',
                'status' => 'in_progress',
                'assignee_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'title' => 'Incorrect calculations on dashboard',
                'description' => 'Dashboard metrics do not reflect the correct calculations.',
                'status' => 'resolved',
                'assignee_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 3,
                'milestone_id' => 3,
                'title' => 'Broken links in navigation',
                'description' => 'Some links in the navigation bar lead to 404 errors.',
                'status' => 'open',
                'assignee_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'project_id' => 3,
                'milestone_id' => null,
                'title' => 'UI inconsistencies in forms',
                'description' => 'Form labels and inputs are misaligned in certain views.',
                'status' => 'in_progress',
                'assignee_id' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
