<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tax::create([
            'tax_name' => 'VAT',
            'rate' => 16,
            'tax_type' => 'sales'
        ]);

        Tax::create([
            'tax_name' => 'GST',
            'rate' => 5,
            'tax_type' => 'purchase'
        ]);
    }
}
