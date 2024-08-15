<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user();

        Log::info('Profile update attempt', ['user_id' => $user->id, 'email' => $user->email]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:5|confirmed',
        ]);

        if ($validator->fails()) {
            Log::warning('Profile update validation failed', [
                'user_id' => $user->id,
                'errors' => $validator->errors()
            ]);
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->name = $request['name'];
        $user->email = $request['email'];

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        Log::info('Profile updated successfully', ['user_id' => $user->id, 'email' => $user->email]);

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function deleteProfile(Request $request): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            Log::info('Profile deletion attempt', ['user_id' => $user->id, 'email' => $user->email]);

            $user->delete();

            Log::info('Profile deleted successfully', ['user_id' => $user->id, 'email' => $user->email]);

            return response()->json(['message' => 'Profile deleted successfully', Response::HTTP_OK]);
        }

        Log::warning('Profile deletion failed: User not found', [
            'user_id' => $user->id ?? 'N/A',
            'email' => $user->email ?? 'N/A'
        ]);

        return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
    }
}
