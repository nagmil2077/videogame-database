<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        Log::info('Registration attempt', ['email' => $request->input('email')]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5|confirmed',
        ]);

        if ($validator->fails()) {
            Log::warning('Registration validation failed', [
                'email' => $request->input('email'),
                'errors' => $validator->errors()->toArray()
            ]);

            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'created_at' => now(),
            ]);

            Log::info('User registered successfully', ['user_id' => $user->id, 'email' => $user->email]);

            return response()->json(['message' => 'User registered successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Error during user registration', [
                'email' => $request->input('email'),
                'exception' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Registration failed, please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
