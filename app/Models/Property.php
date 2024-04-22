<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
  use HasFactory;

  protected $fillable = [
    'description',
    'image_path',
    'address',
    'price',
    'type',
    'rooms',
    'bathrooms',
    'garages',
    'floor',
    'area',
    'year_built',
    'selling_type',
    'is_available',
    'created_by',
    'updated_by',
    'owner',
  ];

  // public function category()
  // {
  //   return $this->belongsTo(Category::class);
  // }
  public function createdBy()
  {
    return $this->belongsTo(User::class, 'created_by');
  }
  public function updatedBy()
  {
    return $this->belongsTo(User::class, 'updated_by');
  }

}
