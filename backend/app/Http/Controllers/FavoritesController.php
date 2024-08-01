<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class FavoritesController extends Controller
{
    public function addToFavorites(Request $request): JsonResponse
    {
        $user = Auth::user();
        $gameId = $request->input('gameId');

        $favorite = Favorite::query()->firstOrCreate(
            ['user_id' => $user->id, 'game_id' => $gameId]
        );

        return response()->json(['message' => 'Game added to favorites', 'favorite' => $favorite]);
    }
}
