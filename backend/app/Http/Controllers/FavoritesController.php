<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class FavoritesController extends Controller
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.rawg.key');
        $this->baseUrl = 'https://api.rawg.io/api';
    }

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

    public function getFavorites(): JsonResponse
    {
        $user = Auth::user();
        $favoriteGameIds = Favorite::query()
            ->where('user_id', $user->id)
            ->pluck('game_id')
            ->toArray();

        $favoriteGames = [];
        foreach ($favoriteGameIds as $gameId) {
            $response = Http::get("{$this->baseUrl}/games/{$gameId}", [
                'key' => $this->apiKey,
            ]);
            if ($response->successful()) {
                $favoriteGames[] = $response->json();
            }
        }

        return response()->json(['favorites' => $favoriteGames], Response::HTTP_OK);
    }
}
