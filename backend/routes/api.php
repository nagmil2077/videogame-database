<?php

use App\Http\Controllers\GameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/games', [GameController::class, 'fetchAllGames']);
Route::get('/games/{slug}', [GameController::class, 'fetchGame']);
Route::get('/games/{slug}/screenshots', [GameController::class, 'fetchScreenshots']);
Route::get('/search', [GameController::class, 'searchGames']);
