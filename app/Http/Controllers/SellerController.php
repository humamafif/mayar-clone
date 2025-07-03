<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerController extends Controller
{
    public function storeInfo(Request $request)
    {
        $seller = $request->user()->seller;

        return Inertia::render('seller/store-info', [
            'seller' => $seller
        ]);
    }

    public function joinForm()
    {
        return Inertia::render('seller/join');
    }

    public function join(Request $request)
    {
        $validated = $request->validate([
            'shop_name' => 'required|string|max:255',
            'shop_description' => 'required|string',
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string',
            'id_card_number' => 'required|string|max:20',
            'bank_account' => 'required|string|max:255',
            'bank_name' => 'required|string|max:50',
            'account_number' => 'required|string|max:30',
            'agree_to_terms' => 'required|accepted',
        ]);

        $user = $request->user();
        $user->update(['role' => 'seller']);

        Seller::create([
            'user_id' => $user->id,
            'shop_name' => $validated['shop_name'],
            'shop_description' => $validated['shop_description'],
            'phone_number' => $validated['phone_number'],
            'address' => $validated['address'],
            'id_card_number' => $validated['id_card_number'],
            'bank_name' => $validated['bank_name'],
            'bank_account' => $validated['bank_account'],
            'account_number' => $validated['account_number'],
        ]);

        return redirect()->route('seller.dashboard')->with('success', 'Selamat! Anda sekarang telah menjadi seller.');
    }

    public function dashboard(Request $request)
    {
        $seller = $request->user()->seller;

        $products = $seller->products()->with(['orders.user'])->get();
        $productsCount = $products->count();
        $balance = $seller->balance;

        $orders = $products->flatMap(function ($product) {
            return $product->orders->map(function ($order) use ($product) {
                return [
                    'id' => $order->id,
                    'order_code' => $order->order_code,
                    'product_name' => $product->name,
                    'quantity' => $order->quantity,
                    'amount' => $order->amount,
                    'status' => $order->status,
                    'buyer_name' => $order->user->name ?? 'N/A',
                    'created_at' => $order->created_at->format('Y-m-d H:i'),
                ];
            });
        })->sortByDesc('created_at')->values();

        return Inertia::render('seller/dashboard', [
            'stats' => [
                'products_count' => $productsCount,
                'balance' => $balance,
            ],
            'orders' => $orders,
        ]);
    }

    public function orders(Request $request)
    {
        $seller = $request->user()->seller;

        $products = $seller->products()->with(['orders.user'])->get();

        $orders = $products->flatMap(function ($product) {
            return $product->orders->map(function ($order) use ($product) {
                return [
                    'id' => $order->id,
                    'order_code' => $order->order_code,
                    'product_name' => $product->name,
                    'quantity' => $order->quantity,
                    'amount' => $order->amount,
                    'status' => $order->status,
                    'buyer_name' => $order->user->name ?? 'N/A',
                    'created_at' => $order->created_at->format('Y-m-d H:i'),
                ];
            });
        })->sortByDesc('created_at')->values();

        return Inertia::render('seller/orders', [
            'orders' => $orders,
        ]);
    }
}
