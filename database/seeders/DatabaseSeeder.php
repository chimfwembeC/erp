<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       

        $this->call([
            UserSeeder::class,
            DepartmentGroupSeeder::class,
            DepartmentSeeder::class,
            BranchSeeder::class,
            RolesAndPermissionsSeeder::class,
            AccountSeeder::class,
            GeneralLedgerSeeder::class,
            JournalEntrySeeder::class,
            SalesInvoiceSeeder::class,
            // PaymentSeeder::class,
            TaxSeeder::class,
        ]);
    }
}
