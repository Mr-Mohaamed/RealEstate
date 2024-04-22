<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CategoryResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $request->id,
      'name' => $request->name,
      'description' => $request->description,
      'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
      'createdBy' => new UserResource($this->createdBy),
      'updatedBy' => new UserResource($this->updatedBy),
    ];
  }
}
