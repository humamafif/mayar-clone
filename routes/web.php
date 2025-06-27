<?php

use App\Http\Controllers\SellerController;
use App\Http\Middleware\SellerMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route untuk semua user yang sudah login
    Route::get('/seller/join', [SellerController::class, 'joinForm'])->name('seller.join');
    Route::post('/seller/join', [SellerController::class, 'join'])->name('seller.process');

    // Route khusus untuk seller
    Route::middleware(SellerMiddleware::class)->group(function () {
        Route::get('seller/dashboard', function () {
            return Inertia::render('seller/dashboard');
        })->name('dashboard');
        Route::get('seller/store-info', [SellerController::class, 'storeInfo'])->name('seller.store-info');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
