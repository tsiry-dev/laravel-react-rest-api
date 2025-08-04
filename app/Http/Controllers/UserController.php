<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::where('role', '!=', 'admin')->get());
    }

    public function user(Request $request)
    {
       return (new UserResource($request->user()))->toArray($request);
    }

    public function destroy(Request $request)
    {
        $user = User::find($request->id);

        if(!$user) {
            return response()->json([
                'message' => 'Impossible de trouver l\'utilisateur.'
            ], 404);
        }

        $user->delete();
    }

}
