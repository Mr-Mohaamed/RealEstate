<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('properties', function (Blueprint $table) {
      $table->id();
      $table->longText('description')->nullable();
      $table->string('image_path')->nullable();
      $table->longText('address')->nullable();
      $table->integer('price');
      $table->longText('type')->nullable();
      $table->integer('rooms')->nullable();
      $table->integer('bathrooms')->nullable();
      $table->integer('garages')->nullable();
      $table->integer('floor')->nullable();
      $table->integer('area')->nullable();
      $table->integer('year_built')->nullable();
      $table->string('selling_type')->nullable();
      $table->boolean('is_available')->nullable();
      // $table->foreignId('category_id')->constrained('categories');
      $table->foreignId('created_by')->constrained('users');
      $table->foreignId('updated_by')->constrained('users');
      $table->string('owner');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('properties');
  }
};
