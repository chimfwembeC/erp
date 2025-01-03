<?php

namespace Database\Seeders;

use App\Models\Equity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equity::create([
            'retained_earnings' => 50000.00,
            'stockholders_equity' => 120000.00,
        ]);
    }
}
