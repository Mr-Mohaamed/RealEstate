<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  use HasFactory;
  protected $fillable = [
    'name',
    'description',
    'image_path',
    'created_by',
    'updated_by',
  ];
  public function properties()
  {
    return $this->hasMany(Property::class);
  }
  public function createdBy()
  {
    return $this->belongsTo(User::class, 'created_by');
  }
  public function updatedBy()
  {
    return $this->belongsTo(User::class, 'updated_by');
  }
}
