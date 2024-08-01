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
        $user = $request->user();
        $gameId = $request->input('game_id');

        $favorite = new Favorite();
        $favorite->user_id = $user->id;
        $favorite->game_id = $gameId;
        $favorite->save();

        return response()->json(['message' => 'Game added to favorites.'], Response::HTTP_CREATED);
    }

    public function removeFromFavorites($gameId): JsonResponse
    {
        $user = Auth::user();

        Favorite::query()->where('user_id', $user->id)->where('game_id', $gameId)->delete();

        return response()->json(['message' => 'Game removed from favorites']);
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
