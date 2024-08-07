<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class GameController extends Controller
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.rawg.key');
        $this->baseUrl = 'https://api.rawg.io/api';
    }

    public function fetchAllGames(Request $request): JsonResponse
    {
        $page = $request->query('page', 1);
        $pageSize = $request->query('page_size', 10);

        try {
            $response = Http::get("{$this->baseUrl}/games", [
                'key' => $this->apiKey,
                'page' => $page,
                'page_size' => $pageSize,
            ]);
            Log::info('Fetched all games', ['page' => $page, 'page_size' => $pageSize]);
            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Error fetching all games', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'Error fetching all games'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchGame($slug): JsonResponse
    {
        try {
            $response = Http::get("{$this->baseUrl}/games/{$slug}", [
                'key' => $this->apiKey,
            ]);
            Log::info('Fetched game', ['slug' => $slug]);
            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Error fetching game', ['slug' => $slug, 'exception' => $e->getMessage()]);
            return response()->json(['error' => 'Error fetching game'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchScreenshots($slug): JsonResponse
    {
        try {
            $response = Http::get("{$this->baseUrl}/games/{$slug}/screenshots", [
                'key' => $this->apiKey,
            ]);
            Log::info('Fetched screenshots', ['slug' => $slug]);
            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Error fetching screenshots', ['slug' => $slug, 'exception' => $e->getMessage()]);
            return response()->json(['error' => 'Error fetching screenshots'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function searchGames(Request $request): JsonResponse
    {
        $query = $request->query('query');

        if (strlen($query) < 2) {
            Log::info('Search query too short', ['query' => $query]);
            return response()->json(['results' => []]);
        }

        try {
            $response = Http::get("{$this->baseUrl}/games", [
                'key' => $this->apiKey,
                'search' => $query,
                'page_size' => 10,
            ]);
            Log::info('Searched games', ['query' => $query]);
            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Error searching games', ['query' => $query, 'exception' => $e->getMessage()]);
            return response()->json(['error' => 'Error searching games'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
