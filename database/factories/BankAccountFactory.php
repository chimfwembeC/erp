<?php

namespace Database\Factories;

use App\Models\BankAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankAccount>
 */
class BankAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = BankAccount::class;

    public function definition()
    {
        return [
            'account_name' => $this->faker->company,
            'account_number' => $this->faker->bankAccountNumber,
            // 'bank_name' => $this->faker->company,
            'current_balance' => $this->faker->randomFloat(2, 1000, 5000),
        ];
    }
}
