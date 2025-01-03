<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CashFlow;
use Carbon\Carbon;

class CashFlowSeeder extends Seeder
{
    public function run()
    {
        // Sample Cash Flow Data (for testing purposes)
        CashFlow::create([
            'type' => 'inflow',
            'amount' => 5000.00,
            'description' => 'Customer Payment for Invoice #123',
            'account_id' => 1, // Replace with an actual account ID if you have accounts
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        CashFlow::create([
            'type' => 'outflow',
            'amount' => 1200.00,
            'description' => 'Payment to Supplier for Raw Materials',
            'account_id' => 2, // Replace with an actual account ID if you have accounts
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        CashFlow::create([
            'type' => 'inflow',
            'amount' => 3000.00,
            'description' => 'Refund from Vendor for Overpayment',
            'account_id' => 3, // Replace with an actual account ID if you have accounts
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        CashFlow::create([
            'type' => 'outflow',
            'amount' => 1500.00,
            'description' => 'Office Rent Payment',
            'account_id' => 4, // Replace with an actual account ID if you have accounts
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
