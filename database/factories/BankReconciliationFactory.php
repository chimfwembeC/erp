<?php

namespace Database\Factories;

use App\Models\BankReconciliation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankReconciliation>
 */
class BankReconciliationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = BankReconciliation::class;

    public function definition()
    {
        return [
            'bank_account_id' => $this->faker->randomNumber(),  // Random bank account ID
            'reconciliation_date' => $this->faker->date(),      // Random date
            'statement_balance' => $this->faker->randomFloat(2, 1000, 5000), // Random float for statement balance
            'ledger_balance' => $this->faker->randomFloat(2, 1000, 5000),    // Random float for ledger balance
        ];
    }
}
