<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Menampilkan halaman daftar semua produk.
     */
    public function products()
    {
        $products = Product::with('seller')
            ->latest()
            ->get();

        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

    /**
     * Menampilkan halaman detail satu produk.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function productDetail(Product $product)
    {
        // Muat relasi seller untuk produk utama
        $product->load('seller.user');

        $relatedProducts = Product::with('seller')
            ->where('seller_id', $product->seller_id)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(3)
            ->get();

        // Render halaman detail
        return Inertia::render('products/detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
