<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PropertyResource;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $query = Category::query();

    $sortField = request('sort_field', 'created_at');
    $sortDirection = request('sort_direction', 'desc');

    if (request("name")) {
      $query->where("name", "like", "%" . request("name") . "%");
    }
    if (request('status')) {
      $query->where('status', request('status'));
    }
    $categories = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

    return inertia("Category/Index", [
      "categories" => CategoryResource::collection($categories),
      'queryParams' => request()->query() ?: null,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia("Category/Create", [
      "category" => new Category(),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCategoryRequest $request)
  {
    $data = $request->validated();
    /** @var $image \Illuminate\Http\UploadedFile */
    $image = $data['image'] ?? null;
    $data['created_by'] = Auth::id();
    $data['updated_by'] = Auth::id();
    if ($image) {
      $data['image_path'] = $image->store('category/' . Str::random(), 'public');
    }
    $category = Category::create($data);

    return to_route("category.index");
  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category)
  {
    $query = $category->propertys();

    $sortField = request('sort_field', 'created_at');
    $sortDirection = request('sort_direction', 'asc');

    if (request("name")) {
      $query->where("name", "like", "%" . request("name") . "%");
    }
    if (request('status')) {
      $query->where('status', request('status'));
    }
    $properties = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

    return inertia("Category/Show", [
      "category" => new CategoryResource($category),
      "properties" => PropertyResource::collection($properties),
      'queryParams' => request()->query() ?: null,
      'code' => $category->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Category $category)
  {
    return inertia("Category/Show", [
      "category" => new CategoryResource($category),
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateCategoryRequest $request, Category $category)
  {
    $data = $request->validated();
    /** @var $image \Illuminate\Http\UploadedFile */
    $image = $data['image'] ?? null;
    $data['updated_by'] = Auth::id();
    if ($image) {
      if ($category->image_path) {
        Storage::disk('public')->deleteDirectory(dirname($category->image_path));
      }
      $data['image_path'] = $image->store('category/' . Str::random(), 'public');
    }
    $category->update($data);

    return to_route("category.show", $category->id);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    $category->delete();
    if ($category->image_path) {
      // Storage::disk('public')->delete($category->image_path);
      Storage::disk('public')->deleteDirectory(dirname($category->image_path));
    }
    return to_route('category.index');
  }
}
