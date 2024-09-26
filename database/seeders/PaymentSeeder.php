<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\SalesInvoice;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $invoice = SalesInvoice::first();

        Payment::create([
            'invoice_id' => 1,
            'amount' => 1000,
            'payment_date' => Carbon::now(),
            'payment_method' => 'credit card'
        ]);
    }
}
