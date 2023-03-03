<?php

use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AjuanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\KlasifikasiController;
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

Route::get('/', [LoginController::class, 'login'])->name('login')->middleware('guest');
Route::post('/', [LoginController::class, 'authenticate']);

Route::get('/logout', [LoginController::class, 'logout'])->middleware('auth');


Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index')->middleware('auth');
Route::get('/ajuan/create', [AjuanController::class, 'create']);
Route::post('/ajuan/create', [AjuanController::class, 'store']);
Route::get('/accept/{id_ajuan}', [AjuanController::class, 'accept']);
Route::post('/reject/{id_ajuan}', [AjuanController::class, 'reject']);
Route::get('/show/{id_ajuan}{token}', [AjuanController::class, 'showtoken']);
Route::get('/ajuan/edit/{id_ajuan}', [AjuanController::class, 'edit']);
Route::post('/ajuan/edit/{id_ajuan}', [AjuanController::class, 'storeedit']);

Route::get('/user/index', [UserController::class, 'index'])->name('user.index');
Route::get('/user/create', [UserController::class, 'create']);
Route::post('/user/create', [UserController::class, 'store']);

Route::get('/klasifikasi/index', [KlasifikasiController::class, 'index'])->name('klasifikasi.index');
Route::get('/klasifikasi/create', [KlasifikasiController::class, 'create']);
Route::post('/klasifikasi/create', [KlasifikasiController::class, 'store']);

