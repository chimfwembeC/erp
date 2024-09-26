<?php

namespace Database\Seeders;

use App\Models\DepartmentGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DepartmentGroup::create(['name' => 'Finance', 'description' => 'Handles financial operations']);
        DepartmentGroup::create(['name' => 'Operations', 'description' => 'Manages daily operations']);
        DepartmentGroup::create(['name' => 'Human Resources', 'description' => 'Handles employee relations']);
    }
}
