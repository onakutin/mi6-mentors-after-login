<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('homepage');
// });

Route::get('/test-user-status', function() {
    dd(Auth::user());
});

// Route::view('/', 'homepage');
// Route::view('/people-of-interest', 'homepage');
// Route::view('/missions', 'homepage');

// Route::view('/admin/{path?}', 'admin-app')->where('path', '.*');

// put this last, this "eats" everything
// if the user comes with GET to any URL, display the 'homepage' view
Route::view('/{path?}', 'homepage')->where('path', '.*');

// Route::get('/{path?}', [AppController::class, 'app'])->where('path', '.*');
