<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
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
      'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
      'user' => new UserResource($this->user),
      'property' => new PropertyResource($this->property),
    ];
  }
}
