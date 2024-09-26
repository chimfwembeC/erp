<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\JournalEntry;
use App\Models\JournalEntryItem;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JournalEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cashAccount = Account::where('account_name', 'Cash')->first();
        $salesAccount = Account::where('account_name', 'Assets')->first();

        // Create Journal Entry
        $journalEntry = JournalEntry::create([
            'reference' => 'INV-1001',
            'description' => 'Cash Sale',
            'total_debit' => 1000,
            'total_credit' => 1000,
            'entry_date' => Carbon::now()
        ]);

        // Create Journal Entry Items
        JournalEntryItem::create([
            'journal_entry_id' => $journalEntry->id,
            'account_id' => $cashAccount->id,
            'debit' => 1000,
            'credit' => null
        ]);

        JournalEntryItem::create([
            'journal_entry_id' => $journalEntry->id,
            'account_id' => $salesAccount->id,
            'debit' => null,
            'credit' => 1000
        ]);
    }
}
