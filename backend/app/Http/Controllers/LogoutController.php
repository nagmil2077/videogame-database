<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class LogoutController extends Controller
{
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        Log::info('Logout attempt', ['user_id' => $user->id, 'email' => $user->email]);

        try {
            $user->currentAccessToken()->delete();

            Log::info('User logged out successfully', ['user_id' => $user->id, 'email' => $user->email]);

            return response()->json(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            Log::error('Error during logout', [
                'user_id' => $user->id,
                'email' => $user->email,
                'exception' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Logout failed, please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
