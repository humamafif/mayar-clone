<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function products()
    {
        $products = Product::with('seller')
            ->get();

        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

    public function productDetail($id)
    {
        $product = Product::with(['seller.user'])->findOrFail($id);
        $relatedProducts = Product::with('seller')
            ->where('seller_id', $product->seller_id)
            ->where('id', '!=', $product->id)
            ->take(3)
            ->get();

        return Inertia::render('products/detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
