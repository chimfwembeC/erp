<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // Seed parent accounts (e.g., assets, liabilities, etc.)
          $asset = Account::create([
            'account_name' => 'Assets',
            'account_type' => 'asset',
            'account_number' => '1000'
        ]);

        $liabilities = Account::create([
            'account_name' => 'Liabilities',
            'account_type' => 'liability',
            'account_number' => '2000'
        ]);

        // Seed child accounts
        Account::create([
            'account_name' => 'Cash',
            'account_type' => 'asset',
            'account_number' => '1010',
            'parent_account_id' => $asset->id
        ]);

        Account::create([
            'account_name' => 'Accounts Receivable',
            'account_type' => 'asset',
            'account_number' => '1020',
            'parent_account_id' => $asset->id
        ]);

        Account::create([
            'account_name' => 'Accounts Payable',
            'account_type' => 'liability',
            'account_number' => '2010',
            'parent_account_id' => $liabilities->id
        ]);
    }
}
