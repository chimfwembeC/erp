<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'sku' => $this->faker->unique()->numerify('SKU-#####-#####-#####'),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 5, 1000), // Price between 5 and 1000
            'quantity' => $this->faker->numberBetween(1, 100), // Random quantity between 1 and 100
            'stock' => $this->faker->numberBetween(1, 100),
        ];
    }
}
