<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{

  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    // $date = $this->faker->dateTimeBetween('-30 years', 'now');

    // Format the date to 'Y-m-d' (year-month-day)
    // $formattedDate = $date->format('Y-m-d');
    return [
      'description' => $this->faker->paragraph,
      'image_path' => $this->faker->imageUrl(),
      'address' => $this->faker->address,
      'price' => $this->faker->numberBetween(100000, 1000000),
      'type' => $this->faker->randomElement(['house', 'apartment']),
      'rooms' => $this->faker->numberBetween(1, 8),
      'bathrooms' => $this->faker->numberBetween(1, 5),
      'garages' => $this->faker->numberBetween(1, 4),
      'floor' => $this->faker->numberBetween(1, 10),
      'area' => $this->faker->numberBetween(1000, 10000),
      'year_built' => $this->faker->date('Y-m-d', now()),
      // 'category_id' => $this->faker->numberBetween(1, 10),
      'selling_type' => $this->faker->randomElement(['sell', 'rent']),
      'is_available' => $this->faker->randomElement([true, false]),
      'created_by' => $this->faker->numberBetween(1, 10),
      'updated_by' => $this->faker->numberBetween(1, 10),
      'owner' => $this->faker->name,
      // 'user_id' => $this->faker->numberBetween(1, 10),
      'created_at' => now(),
      'updated_at' => now(),
      // 'deleted_at' => null,
      // 'is_active' => $this->faker->randomElement([true, false]),
      // 'is_featured' => $this->faker->randomElement([true, false]),
      // 'is_sold' => $this->faker->randomElement([true, false]),
    ];
  }
}
