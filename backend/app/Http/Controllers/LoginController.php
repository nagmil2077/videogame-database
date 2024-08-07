<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class LoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:5',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                Log::info('User logged in successfully', ['user_id' => $user->id, 'email' => $user->email]);

                return response()->json([
                    'token' => $token,
                    'user' => $user,
                ], Response::HTTP_OK);
            } else {
                Log::warning('Failed login attempt', ['email' => $request->input('email')]);
                return response()->json(['error' => 'Invalid email or password'], Response::HTTP_UNAUTHORIZED);
            }
        } catch (\Exception $e) {
            Log::error('Error during login', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred during login'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
