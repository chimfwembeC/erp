<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\GeneralLedger;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeneralLedgerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cashAccount = Account::where('account_name', 'Cash')->first();
        $receivableAccount = Account::where('account_name', 'Accounts Receivable')->first();
        $user = User::first();

        // Example transaction for cash sale
        GeneralLedger::create([
            'account_id' => $cashAccount->id,
            'user_id' => $user->id,
            'debit' => 1000,
            'credit' => null,
            'description' => 'Cash Sale',
            'transaction_date' => Carbon::now()
        ]);

        GeneralLedger::create([
            'account_id' => $receivableAccount->id,
            'user_id' => $user->id,
            'debit' => null,
            'credit' => 1000,
            'description' => 'Accounts Receivable from Sale',
            'transaction_date' => Carbon::now()
        ]);
    }
}
