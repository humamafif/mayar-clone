<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Middleware\SellerMiddleware;
use Illuminate\Support\Facades\Route;

// ======================
// PUBLIC ROUTES
// ======================
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [HomeController::class, 'products'])->name('products');
Route::get('/products/{product}', [HomeController::class, 'productDetail'])->name('products.detail');

// ======================
// AUTHENTICATED ROUTES
// ======================
Route::middleware(['auth', 'verified'])->group(function () {
    // Join as Seller
    Route::get('/seller/join', [SellerController::class, 'joinForm'])->name('seller.join');
    Route::post('/seller/join', [SellerController::class, 'join'])->name('seller.process');

    // Cart
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::get('/cart/list', [CartController::class, 'getCart'])->name('cart.list');
    Route::post('/cart/{id}/cancel', [CartController::class, 'cancel'])->name('cart.cancel');

    // Invoice
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::prefix('invoices')->name('invoices.')->group(function () {
        Route::post('/', [InvoiceController::class, 'store'])->name('store');
        Route::get('/{id}', [InvoiceController::class, 'show'])->name('show');
    });
});

// ======================
// SELLER ROUTES
// ======================
Route::middleware(['auth', SellerMiddleware::class])
    ->prefix('seller')
    ->name('seller.')
    ->group(function () {
        Route::get('/dashboard', [SellerController::class, 'dashboard'])->name('dashboard');
        Route::get('/store-settings', [SellerController::class, 'storeInfo'])->name('store-info');
        Route::put('/store-settings/update', [SellerController::class, 'updateStore'])->name('store-info.update');
        Route::resource('products', ProductController::class);
        Route::get('/transactions', [SellerController::class, 'invoices'])->name('invoices');
    });


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
