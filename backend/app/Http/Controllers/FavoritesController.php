<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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

    public function removeFromFavorites($gameId): JsonResponse
    {
        $user = Auth::user();

        Favorite::query()->where('user_id', $user->id)->where('game_id', $gameId)->delete();

        return response()->json(['message' => 'Game removed from favorites']);
    }

    public function getFavorites(): JsonResponse
    {
        $user = Auth::user();
        $favorites = $user->favorites;

        return response()->json(['favorites' => $favorites]);
    }

    public function checkFavorite(Request $request, $game_id): JsonResponse
    {
        $user = $request->user();
        $isFavorite = Favorite::query()->where('user_id', $user->id)
            ->where('game_id', $game_id)
            ->exists();

        return response()->json(['isFavorite' => $isFavorite], Response::HTTP_OK);
    }
}
