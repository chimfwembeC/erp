<?php

namespace Database\Seeders;

use App\Models\IncomeStatement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeStatementTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IncomeStatement::create([
            'revenue' => 100000.00,
            'expenses' => 60000.00,
            'net_income' => 40000.00,
        ]);
    }
}
