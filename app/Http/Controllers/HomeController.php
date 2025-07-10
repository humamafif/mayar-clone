<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestProducts = Product::with('seller')
            ->withSum('paidInvoiceItems as total_sold', 'quantity')
            ->latest()
            ->take(6)
            ->get();

        $bestSellerProducts = Product::with('seller')
            ->withSum('paidInvoiceItems as total_sold', 'quantity')
            ->orderByDesc('total_sold')
            ->take(3)
            ->get();

        return Inertia::render('welcome', [
            'latestProducts' => $latestProducts,
            'bestSellers' => $bestSellerProducts,
        ]);
    }

    public function products()
    {
        $products = Product::with('seller')
            ->withSum('paidInvoiceItems as total_sold', 'quantity')
            ->get();

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }


    public function productDetail(Product $product)
    {
        $product->load('seller.user')->loadSum('paidInvoiceItems as total_sold', 'quantity');;
        $relatedProducts = Product::with('seller')
            ->withSum('paidInvoiceItems as total_sold', 'quantity')
            ->where('seller_id', $product->seller_id)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(3)
            ->get();
        return Inertia::render('products/detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
