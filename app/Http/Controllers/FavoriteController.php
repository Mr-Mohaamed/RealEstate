<?php

namespace App\Http\Controllers;

use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Requests\UpdateFavoriteRequest;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $query = Favorite::query();
    $user = Auth::user();


    $sortField = request('sort_field', 'created_at');
    $sortDirection = request('sort_direction', 'desc');

    $query->where("user_id", "=", $user->id);

    $favorites = $query->orderBy($sortField, $sortDirection)->paginate(12)->onEachSide(1);

    return inertia("Favorite/Index", [
      "favorites" => FavoriteResource::collection($favorites),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreFavoriteRequest $request)
  {
    $data = $request->validated();
    $data['user_id'] = Auth::id();
    $favorite = Favorite::create($data);
  }

  /**
   * Display the specified resource.
   */
  public function show(Favorite $favorite)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Favorite $favorite)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateFavoriteRequest $request, Favorite $favorite)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Favorite $favorite)
  {
    $favorite->delete();
  }
}
