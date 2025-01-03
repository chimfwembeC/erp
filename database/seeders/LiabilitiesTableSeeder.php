<?php

namespace Database\Seeders;

use App\Models\Liability;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LiabilitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Liability::create([
            'liability_type' => 'Short-term',
            'amount' => 30000.00,
        ]);

        Liability::create([
            'liability_type' => 'Long-term',
            'amount' => 150000.00,
        ]);
    }
}
