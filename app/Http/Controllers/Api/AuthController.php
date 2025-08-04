<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'remember_token' => \Illuminate\Support\Str::random(15),
        ]);

        $token = $user->createToken('laravel-react-rest-api')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);

    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        /**
         * @var User $user
         */
        $user = Auth::user();
        $token = $user->createToken('laravel-react-rest-api')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function logout(Request $request)
    {

        $user = $request->user();

        if ($user?->currentAccessToken()) {
            $user->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Déconnexion réussie.'
            ], 200);
        }

        return response()->json([
            'message' => 'Utilisateur non authentifié ou token manquant.'
        ], 401);
    }
}
