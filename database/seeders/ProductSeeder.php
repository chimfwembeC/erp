<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Product 1',
            'description' => 'First product',
            'price' => 100.00,
            'quantity_in_stock' => 50,
        ]);

        Product::create([
            'name' => 'Product 2',
            'description' => 'Second product',
            'price' => 200.00,
            'quantity_in_stock' => 30,
        ]);
    }
}
