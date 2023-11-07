<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\MissionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/people', [PersonController::class, 'index']);
Route::get('/people/{person_id}', [PersonController::class, 'show']);
Route::get('/statuses', [StatusController::class, 'index']);
Route::get('/missions', [MissionController::class, 'index']);
Route::get('/missions/{mission_id}', [MissionController::class, 'show']);
Route::post('/missions/{mission_id}/store', [MissionController::class, 'store']);