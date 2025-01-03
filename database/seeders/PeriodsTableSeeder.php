<?php

namespace Database\Seeders;

use App\Models\Period;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeriodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Period::create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
            'period_name' => 'January 2025',
        ]);

        Period::create([
            'start_date' => '2025-02-01',
            'end_date' => '2025-02-28',
            'period_name' => 'February 2025',
        ]);
    }
}
