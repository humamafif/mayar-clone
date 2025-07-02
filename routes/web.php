<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Middleware\SellerMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $products = App\Models\Product::with('seller')
        ->get();
    return Inertia::render('welcome', [
        'products' => $products
    ]);
})->name('home');
Route::get('/products', [HomeController::class, 'products'])->name('products');
Route::get('/products/{id}', [HomeController::class, 'productDetail'])->name('products.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/seller/join', [SellerController::class, 'joinForm'])->name('seller.join');
    Route::post('/seller/join', [SellerController::class, 'join'])->name('seller.process');
});

Route::middleware(['auth', SellerMiddleware::class])->group(function () {
    Route::get('/seller/dashboard', function (Request $request) {
        $seller = $request->user()->seller;
        $productsCount = $seller->products()->count();
        return Inertia::render('seller/dashboard', [
            'stats' => [
                'products_count' => $productsCount,
            ]
        ]);
    })->name('seller.dashboard');
    Route::get('/seller/store-info', [SellerController::class, 'storeInfo'])->name('seller.store-info');
    Route::resource('/seller/products', ProductController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
