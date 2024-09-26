<?php

namespace Database\Seeders;

use App\Models\SalesInvoice;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalesInvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = User::where('role', 'customer')->first();

        SalesInvoice::create([
            'customer_id' => $customer->id,
            'total_amount' => 1000,
            'tax_amount' => 100,
            'discount_amount' => 50,
            'invoice_date' => Carbon::now(),
            'due_date' => Carbon::now()->addDays(30),
            'status' => 'unpaid'
        ]);
    }
}
