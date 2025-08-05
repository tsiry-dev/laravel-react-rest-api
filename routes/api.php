<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
     return new UserResource($request->user());
})->middleware('auth:sanctum');


Route::post('/signup', [App\Http\Controllers\Api\AuthController::class, 'signup']);
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);
// routes/api.php


Route::middleware(['auth:sanctum', 'user'])->group(function (){

    Route::get('/contacts/count', [ContactController::class, 'count']);
    Route::get('/contacts/{id}', [ContactController::class, 'findAll']);
    Route::delete('/contacts/remove/{id}', [ContactController::class, 'destroy']);
    Route::post('/contacts', [ContactController::class, 'store']);
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);


});

Route::middleware(['auth:sanctum', 'admin'])->group(function (){

    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

});


