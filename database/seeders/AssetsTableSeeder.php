<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Asset::create([
            'asset_type' => 'Current',
            'value' => 50000.00,
        ]);

        Asset::create([
            'asset_type' => 'Non-Current',
            'value' => 200000.00,
        ]);
    }
}
