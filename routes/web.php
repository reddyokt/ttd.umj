<?php

use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AjuanController;
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
//     return view('welcome');
// });

Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/ajuan/create', [AjuanController::class, 'create']);
Route::post('/ajuan/create', [AjuanController::class, 'store']);

Route::get('/accept/{id_ajuan}', [AjuanController::class, 'accept']);

Route::get('/show/{token}', [AjuanController::class, 'showtoken']);
