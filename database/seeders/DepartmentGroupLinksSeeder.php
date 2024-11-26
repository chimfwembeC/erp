<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Department; // Assuming you're using Eloquent models for departments
use App\Models\DepartmentGroup; // Assuming you're using Eloquent models for department groups

class DepartmentGroupLinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fetch all departments and groups
        $departments = Department::all();
        $departmentGroups = DepartmentGroup::all();

        // Insert links between random departments and groups
        foreach ($departmentGroups as $group) {
            // Randomly link each department to the group
            $group->departments()->attach(
                $departments->random(rand(1, 3))->pluck('id')->toArray()
            );
        }

        // Or if you have specific links you want to add, use:
        // DB::table('department_group_links')->insert([
        //     ['department_id' => 1, 'department_group_id' => 2],
        //     ['department_id' => 3, 'department_group_id' => 1],
        // ]);
    }
}
