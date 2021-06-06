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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('quiz')->middleware(['auth', 'verified'])->group(function(){
    Route::get('/form', [QuizController::class, 'create'])->name('quiz.form');
    Route::post('/generate', [QuizController::class, 'generate'])->name('quiz.generate');
});


Route::prefix('paper')->middleware(['auth', 'verified'])->group(function(){
    Route::get('/form', [PaperController::class, 'create'])->name('paper.form');
    Route::get('/list', [PaperController::class, 'list'])->name('paper.list');
    Route::get('/generate/{paperId}', [PaperController::class, 'generate'])->name('paper.generate');
});

require __DIR__.'/auth.php';

