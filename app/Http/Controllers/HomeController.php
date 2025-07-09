<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // latest products
        $latestProducts = Product::with('seller')
            ->select('products.*', DB::raw('COALESCE(SUM(invoice_items.quantity), 0) as total_sold'))
            ->leftJoin('invoice_items', 'products.id', '=', 'invoice_items.product_id')
            ->leftJoin('invoices', 'invoices.id', '=', 'invoice_items.invoice_id')
            ->where(function ($query) {
                $query->where('invoices.status', 'paid')
                    ->orWhereNull('invoices.status');
            })
            ->groupBy('products.id')
            ->orderBy('products.created_at', 'desc')
            ->take(6)
            ->get();

        // best seller produk (sudah memiliki total_sold)
        $bestSellerProducts = Product::with('seller')
            ->select('products.*', DB::raw('COALESCE(SUM(invoice_items.quantity), 0) as total_sold'))
            ->leftJoin('invoice_items', 'products.id', '=', 'invoice_items.product_id')
            ->leftJoin('invoices', 'invoices.id', '=', 'invoice_items.invoice_id')
            ->where(function ($query) {
                $query->where('invoices.status', 'paid')
                    ->orWhereNull('invoices.status');
            })
            ->groupBy('products.id')
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
            ->select('products.*', DB::raw('COALESCE(SUM(invoice_items.quantity), 0) as total_sold'))
            ->leftJoin('invoice_items', 'products.id', '=', 'invoice_items.product_id')
            ->leftJoin('invoices', 'invoices.id', '=', 'invoice_items.invoice_id')
            ->where(function ($query) {
                $query->where('invoices.status', 'paid')
                    ->orWhereNull('invoices.status');
            })
            ->groupBy('products.id')
            ->get();

        return Inertia::render('products/index', [
            'products' => $products,
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
        $product->load('seller.user');

        $relatedProducts = Product::with('seller')
            ->where('seller_id', $product->seller_id)
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(3)
            ->get();

        $soldCount = DB::table('invoice_items')
            ->join('invoices', 'invoices.id', '=', 'invoice_items.invoice_id')
            ->where('invoice_items.product_id', $product->id)
            ->where('invoices.status', 'paid')
            ->sum('invoice_items.quantity');
        $product->total_sold = $soldCount;

        return Inertia::render('products/detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
