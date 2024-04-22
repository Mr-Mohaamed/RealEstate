<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PropertyResource extends JsonResource
{
  public static $wrap = false;

  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'address' => $this->address,
      'description' => $this->description,
      'price' => $this->price,
      'type' => $this->type,
      'rooms' => $this->rooms,
      'bathrooms' => $this->bathrooms,
      'garages' => $this->garages,
      'owner' => $this->owner,
      'floor' => $this->floor,
      'area' => $this->area,
      'selling_type' => $this->selling_type,
      'is_available' => $this->is_available,
      'category_id' => $this->category_id,
      'year_built' => $this->year_built,
      // 'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
      'image_path' => $this->image_path,
      'category' => new CategoryResource($this->category),
      'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
      'createdBy' => new UserResource($this->createdBy),
      'updatedBy' => new UserResource($this->updatedBy),
    ];
  }
}
