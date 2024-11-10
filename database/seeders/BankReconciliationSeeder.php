<?php

namespace Database\Seeders;

use App\Models\BankAccount;
use App\Models\BankReconciliation;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BankReconciliationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create 10 bank accounts
        $bankAccounts = BankAccount::factory()->count(10)->create();

        // Create 10 random bank reconciliations for each bank account
        $bankAccounts->each(function ($bankAccount) {
            BankReconciliation::factory()->create([
                'bank_account_id' => $bankAccount->id,
                'reconciliation_date' => Carbon::now()->subMonths(rand(1, 6)),  // Random date in the past 6 months
                'statement_balance' => rand(1000, 5000),
                'ledger_balance' => rand(1000, 5000),
            ]);
        });
    }
}
