<?php

use App\Http\Controllers\QuizController;
use App\Http\Controllers\PaperController;
use Illuminate\Support\Facades\Route;


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
    return view('welcome');
});

Route::prefix('quiz')->group(function(){
    Route::get('/form', [QuizController::class, 'create'])->name('quiz.form');
    Route::post('/generate', [QuizController::class, 'generate'])->name('quiz.generate');
});

Route::prefix('paper')->group(function(){
    Route::get('/form', [PaperController::class, 'create'])->name('paper.form');
    Route::post('/generate', [PaperController::class, 'generate'])->name('paper.generate');
    Route::get('/show', [PaperController::class, 'show']);
});


