<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Branch::create(['name' => 'New York Office', 'location' => 'New York, NY']);
        Branch::create(['name' => 'London Office', 'location' => 'London, UK']);
        Branch::create(['name' => 'Headquarters', 'location' => 'San Francisco, CA']);
    }
}
