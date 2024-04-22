<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');


Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/property/index', [PropertyController::class, 'index'])->name('property.index');
Route::get('/property/create', [PropertyController::class, 'create'])->middleware('auth', 'verified')->name('property.create');
Route::get('/property/{property}', [PropertyController::class, 'show'])->name('property.show');

Route::middleware(['auth', 'verified'])->group(function () {

  // Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::resource('category', CategoryController::class);
  // Route::get('task/my-task', [TaskController::class, 'myTasks'])->name('task.myTasks');
  // Route::resource('property', PropertyController::class);
  // Route::resource('user', UserController::class);
  Route::resource('favorite', FavoriteController::class);

  // Route::get('/property/create', [PropertyController::class, 'create'])->name('property.create');
  Route::post('/property', [PropertyController::class, 'store'])->name('property.store');
  Route::delete('/property/{property}', [PropertyController::class, 'destroy'])->name('property.destroy');
  Route::get('/property/{property}/edit', [PropertyController::class, 'edit'])->name('property.edit');
  Route::put('/property/{property}', [PropertyController::class, 'update'])->name('property.update');
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
