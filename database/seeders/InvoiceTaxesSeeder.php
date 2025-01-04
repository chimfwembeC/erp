<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InvoiceTaxesSeeder extends Seeder
{
    public function run()
    {
        // Insert sample data into the invoice_taxes table
        DB::table('invoice_taxes')->insert([
            [
                'invoice_id' => 1,
                'tax_id' => 1,
                'tax_amount' => 50.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'invoice_id' => 2,
                'tax_id' => 2,
                'tax_amount' => 75.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'invoice_id' => 3,
                'tax_id' => 1,
                'tax_amount' => 100.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'invoice_id' => 4,
                'tax_id' => 3,
                'tax_amount' => 25.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'invoice_id' => 5,
                'tax_id' => 2,
                'tax_amount' => 50.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
