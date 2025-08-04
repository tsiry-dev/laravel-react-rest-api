<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if(!$user || !in_array($user->role, ['user','admin'])) {
            return  response()->json([
                'message' => 'Vous n\'êtes pas autorisé à accéder à cette ressource.'
            ], 403);
        }

        return $next($request);

    }
}
