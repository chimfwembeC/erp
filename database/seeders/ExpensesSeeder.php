<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expense;
use Carbon\Carbon;

class ExpensesSeeder extends Seeder
{
    public function run()
    {
        // Sample Expenses Data (for testing purposes)
        Expense::create([
            'category' => 'Rent',
            'amount' => 1500.00,
            'date' => Carbon::now()->subMonths(1), // Last month
            'description' => 'Monthly office rent payment',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Expense::create([
            'category' => 'Salaries',
            'amount' => 5000.00,
            'date' => Carbon::now()->subMonths(1), // Last month
            'description' => 'Employee salaries for the month',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Expense::create([
            'category' => 'Utilities',
            'amount' => 300.00,
            'date' => Carbon::now()->subMonths(1), // Last month
            'description' => 'Electricity and water bills',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Expense::create([
            'category' => 'Marketing',
            'amount' => 1200.00,
            'date' => Carbon::now()->subWeeks(2), // Two weeks ago
            'description' => 'Marketing campaign for the new product launch',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
