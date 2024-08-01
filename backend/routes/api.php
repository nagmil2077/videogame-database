<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/games', [GameController::class, 'fetchAllGames']);
Route::get('/games/{slug}', [GameController::class, 'fetchGame']);
Route::get('/games/{slug}/screenshots', [GameController::class, 'fetchScreenshots']);
Route::get('/search', [GameController::class, 'searchGames']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::patch('/profile/update', [UserController::class, 'updateProfile']);
    Route::delete('/profile', [UserController::class, 'deleteProfile']);
});
