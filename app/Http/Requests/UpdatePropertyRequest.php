<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePropertyRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'image' => ['nullable', 'image'],
      'owner' => ['nullable', 'max:255'],
      'address' => ['nullable', 'string'],
      'price' => ['nullable', 'integer'],
      'area' => ['nullable', 'integer'],
      'selling_type' => ['nullable', Rule::in(['sell', 'rent'])],
      'type' => ['nullable', Rule::in(['house', 'appartment'])],
      'description' => ['nullable', 'string'],
      "year_built" => ["nullable", 'string'],
      'rooms' => ["nullable", 'integer'],
      'bathrooms' => ["nullable", 'integer'],
      'garages' => ["nullable", 'integer'],
      'floor' => ["nullable", 'integer']
    ];
  }
}
