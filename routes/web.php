<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Middleware\SellerMiddleware;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ======================
// HALAMAN PUBLIK
// ======================
Route::get('/', function () {
    $products = Product::with('seller')->latest()->take(8)->get();
    return Inertia::render('welcome', [
        'products' => $products
    ]);
})->name('home');

Route::get('/products', [HomeController::class, 'products'])->name('products');
Route::get('/products/{product}', [HomeController::class, 'productDetail'])->name('products.detail');

// ======================
// USER TERAUTENTIKASI
// ======================
Route::middleware(['auth', 'verified'])->group(function () {
    // Join sebagai seller
    Route::get('/seller/join', [SellerController::class, 'joinForm'])->name('seller.join');
    Route::post('/seller/join', [SellerController::class, 'join'])->name('seller.process');

    // Cart
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/add', [CartController::class, 'add'])->name('add');
        Route::delete('/remove/{id}', [CartController::class, 'remove'])->name('remove');
        Route::post('/checkout', [CartController::class, 'checkout'])->name('checkout');
    });

    // Order (Pembeli)
    Route::get('/order', [OrderController::class, 'index'])->name('order.index');
    Route::prefix('order')->name('order.')->group(function () {
        Route::post('/', [OrderController::class, 'store'])->name('store');
        Route::get('/{id}', [OrderController::class, 'show'])->name('show');
        Route::get('/success', [OrderController::class, 'success'])->name('success');
        Route::get('/failure', [OrderController::class, 'failure'])->name('failure');
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
        Route::get('/store-info', [SellerController::class, 'storeInfo'])->name('store-info');
        Route::get('/orders', [SellerController::class, 'orderList'])->name('orders'); // ✅ Transaksi penjualan seller
        Route::resource('products', ProductController::class);
        Route::get('/orders', [SellerController::class, 'orders'])->name('orders');

    });


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
