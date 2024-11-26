<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Departments for Software Development company
        Department::create([
            'name' => 'Accounting',
            'department_group_id' => 1, // Finance
        ]);

        Department::create([
            'name' => 'Logistics',
            'department_group_id' => 2, // Operations
        ]);

        Department::create([
            'name' => 'Recruitment',
            'department_group_id' => 3, // Human Resources
        ]);

        Department::create([
            'name' => 'Backend Development',
            'department_group_id' => 4, // Software Development
        ]);

        Department::create([
            'name' => 'Frontend Development',
            'department_group_id' => 4, // Software Development
        ]);

        Department::create([
            'name' => 'Mobile Development',
            'department_group_id' => 4, // Software Development
        ]);

        Department::create([
            'name' => 'Quality Assurance',
            'department_group_id' => 5, // Quality Assurance
        ]);

        Department::create([
            'name' => 'Product Management',
            'department_group_id' => 6, // Product Management
        ]);

        Department::create([
            'name' => 'Sales',
            'department_group_id' => 7, // Sales and Marketing
        ]);

        Department::create([
            'name' => 'Marketing',
            'department_group_id' => 7, // Sales and Marketing
        ]);

        Department::create([
            'name' => 'Customer Support',
            'department_group_id' => 8, // Customer Support
        ]);

        Department::create([
            'name' => 'Legal',
            'department_group_id' => 9, // Legal and Compliance
        ]);

        Department::create([
            'name' => 'R&D',
            'department_group_id' => 10, // Research and Development
        ]);
    }
}
