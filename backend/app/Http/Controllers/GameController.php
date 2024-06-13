<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GameController extends Controller
{
    private $apiKey;
    private $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.rawg.key');
        $this->baseUrl = 'https://api.rawg.io/api';
    }

    public function fetchAllGames(Request $request)
    {
        $page = $request->query('page', 1);
        $pageSize = $request->query('page_size', 10);

        $response = Http::get("{$this->baseUrl}/games", [
            'key' => $this->apiKey,
            'page' => $page,
            'page_size' => $pageSize,
        ]);

        return response()->json($response->json());
    }
}
