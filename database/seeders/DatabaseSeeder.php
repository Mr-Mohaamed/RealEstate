<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Property;
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

    User::factory()->create([
      'name' => 'User1',
      'email' => 'user1@asd.asd',
      'password' => bcrypt('123123.Aa'),
      'email_verified_at' => time(),
    ]);
    User::factory(10)->create();
    // Category::factory()->count(10)->hasProperties(15)->create();
    Property::factory(150)->create();
  }
}
