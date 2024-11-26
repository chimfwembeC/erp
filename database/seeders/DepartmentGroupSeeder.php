<?php

namespace Database\Seeders;

use App\Models\DepartmentGroup;
use Illuminate\Database\Seeder;

class DepartmentGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DepartmentGroup::create(['name' => 'Software Development', 'description' => 'Responsible for writing, testing, and maintaining code']);
        DepartmentGroup::create(['name' => 'Quality Assurance', 'description' => 'Ensures software quality through testing and validation']);
        DepartmentGroup::create(['name' => 'Human Resources', 'description' => 'Handles employee relations and recruitment']);
        DepartmentGroup::create(['name' => 'Operations', 'description' => 'Manages daily operations, infrastructure, and IT support']);
        DepartmentGroup::create(['name' => 'Product Management', 'description' => 'Defines product vision, strategy, and lifecycle']);
        DepartmentGroup::create(['name' => 'Sales and Marketing', 'description' => 'Focuses on customer acquisition, advertising, and branding']);
        DepartmentGroup::create(['name' => 'Finance', 'description' => 'Handles financial planning, accounting, and reporting']);
        DepartmentGroup::create(['name' => 'Customer Support', 'description' => 'Provides assistance to customers and resolves issues']);
        DepartmentGroup::create(['name' => 'Legal and Compliance', 'description' => 'Manages legal matters and ensures regulatory compliance']);
        DepartmentGroup::create(['name' => 'Research and Development', 'description' => 'Focuses on developing new technologies and products']);
    }
}
