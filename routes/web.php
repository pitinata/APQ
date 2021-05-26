<?php

use App\Http\Controllers\PaperController;
use App\Http\Controllers\QuizController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('quiz')->group(function(){
    Route::get('/form', [QuizController::class, 'create'])->name('quiz.form');
    Route::post('/generate', [QuizController::class, 'generate'])->name('quiz.generate');
});

Route::prefix('paper')->group(function(){
    Route::get('/form', [PaperController::class, 'create'])->name('paper.form');
    Route::post('/generate', [PaperController::class, 'generate'])->name('paper.generate');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';

