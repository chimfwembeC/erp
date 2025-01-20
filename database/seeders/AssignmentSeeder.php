<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AssignmentSeeder extends Seeder
{
    public function run()
    {
        DB::table('assignments')->insert([
            // Assign users to projects
            [
                'user_id' => 1, // Assignee (from users table)
                'assignable_type' => 'App\Models\Project', // Type of the assignment
                'assignable_id' => 1, // ID of the assigned project
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'assignable_type' => 'App\Models\Project',
                'assignable_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Assign users to issues
            [
                'user_id' => 3,
                'assignable_type' => 'App\Models\Issue',
                'assignable_id' => 1, // ID of the assigned issue
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'assignable_type' => 'App\Models\Issue',
                'assignable_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Assign users to tasks
            [
                'user_id' => 2,
                'assignable_type' => 'App\Models\Task',
                'assignable_id' => 1, // ID of the assigned task
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'assignable_type' => 'App\Models\Task',
                'assignable_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            // Assign users to milestones
            [
                'user_id' => 2,
                'assignable_type' => 'App\Models\Milestone',
                'assignable_id' => 1, // ID of the assigned milestone
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'assignable_type' => 'App\Models\Milestone',
                'assignable_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
