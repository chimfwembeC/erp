<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Department::create([
            'name' => 'Accounting',
            // 'branch_id' => 1,
            'department_group_id' => 1 // Finance
        ]);

        Department::create([
            'name' => 'Logistics',
            // 'branch_id' => 1,
            'department_group_id' => 2 // Operations
        ]);

        Department::create([
            'name' => 'Recruitment',
            // 'branch_id' => 1,
            'department_group_id' => 3 // Human Resources
        ]);
    }
}
