<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $query = Property::query();

    $sortField = request('sort_field', 'created_at');
    $sortDirection = request('sort_direction', 'asc');

    if (request("name")) {
      $query->where("address", "like", "%" . request("name") . "%");
    }
    if (request('status')) {
      $query->where('selling_type', request('status'));
    }
    $filterType = request('filterType');
    // Filter Rooms
    $minRooms = request("minRooms");
    $maxRooms = request("maxRooms");
    if ($minRooms && $maxRooms) {
      if ($maxRooms < $minRooms) {
        $temp = $maxRooms;
        $maxRooms = $minRooms;
        $minRooms = $temp;
      }
      $query->whereBetween('rooms', [$minRooms, $maxRooms]);
    } else if ($minRooms) {
      $query->where('rooms', '>=', $minRooms);
    } else if ($maxRooms) {
      $query->where('rooms', '<=', $maxRooms);
    }

    // Filter Floors

    $minFloors = request("minFloors");
    $maxFloors = request("maxFloors");
    if ($minFloors && $maxFloors) {
      if ($maxFloors < $minFloors) {
        $temp = $maxFloors;
        $maxFloors = $minFloors;
        $minFloors = $temp;
      }
      $query->whereBetween('floor', [$minFloors, $maxFloors]);
    } else if ($minFloors) {
      $query->where('floor', '>=', $minFloors);
    } else if ($maxFloors) {
      $query->where('floor', '<=', $maxFloors);
    }
    // Filter Garages

    $minGarages = request("minGarages");
    $maxGarages = request("maxGarages");
    if ($minGarages && $maxGarages) {
      if ($maxGarages < $minGarages) {
        $temp = $maxGarages;
        $maxGarages = $minGarages;
        $minGarages = $temp;
      }
      $query->whereBetween('garages', [$minGarages, $maxGarages]);
    } else if ($minGarages) {
      $query->where('garages', '>=', $minGarages);
    } else if ($maxGarages) {
      $query->where('garages', '<=', $maxGarages);
    }

    $properties = $query->orderBy($sortField, $sortDirection)->paginate(12)->onEachSide(1);

    return inertia("Property/Index", [
      "properties" => PropertyResource::collection($properties),
      'queryParams' => request()->query() ?: null,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $categories = Category::query()->orderBy('name', 'asc')->get();
    $users = User::query()->orderBy('name', 'asc')->get();
    return inertia("Property/Create", [
      "categories" => $categories,
      "users" => $users,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePropertyRequest $request)
  {
    $data = $request->validated();
    /** @var $image \Illuminate\Http\UploadedFile */
    $image = $data['image'] ?? null;
    $data['created_by'] = Auth::id();
    $data['updated_by'] = Auth::id();
    if ($image) {
      $data['image_path'] = $image->store('property/' . Str::random(), 'public');
    }
    $property = Property::create($data);

    return to_route("property.index");
  }

  /**
   * Display the specified resource.
   */
  public function show(Property $property)
  {
    $query = Favorite::query();
    $query->where('user_id', Auth::id());
    $query->where('property_id', $property->id);
    $favorite = $query->first();
    return inertia("Property/Show", [
      "property" => new PropertyResource($property),
      "favorite" => $favorite,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Property $property)
  {
    // $categories = Category::query()->orderBy('name', 'asc')->get();
    $users = User::query()->orderBy('name', 'asc')->get();
    // dd($categories);
    return inertia("Property/Edit", [
      "property" => new PropertyResource($property),
      // "categories" => $categories,
      "users" => $users,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePropertyRequest $request, Property $property)
  {
    $data = $request->validated();
    /** @var $image \Illuminate\Http\UploadedFile */
    $image = $data['image'] ?? null;
    $data['updated_by'] = Auth::id();
    if ($image) {
      if ($property->image_path) {
        Storage::disk('public')->deleteDirectory(dirname($property->image_path));
      }
      $data['image_path'] = $image->store('property/' . Str::random(), 'public');
    }
    $property->update($data);

    return to_route("property.index");
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Property $property)
  {
    $property->delete();
    if ($property->image_path) {
      // Storage::disk('public')->delete($property->image_path);
      Storage::disk('public')->deleteDirectory(dirname($property->image_path));
    }
    return to_route('property.index');
  }
}
