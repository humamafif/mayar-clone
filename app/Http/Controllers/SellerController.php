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

        $products = $seller->products()->with(['invoiceItems.invoice.user'])->get();
        $productsCount = $products->count();
        $balance = $seller->balance;

        $invoices = $products->flatMap(function ($product) {
            return $product->invoiceItems->map(function ($item) use ($product) {
                return [
                    'id' => $item->invoice->id,
                    'invoice_code' => $item->invoice->invoice_code,
                    'product_name' => $product->name,
                    'quantity' => $item->quantity,
                    'amount' => $item->price * $item->quantity,
                    'status' => $item->invoice->status,
                    'buyer_name' => $item->invoice->user->name ?? 'N/A',
                    'created_at' => $item->invoice->created_at->format('Y-m-d H:i'),
                ];
            });
        })->sortByDesc('created_at')->values();

        return Inertia::render('seller/dashboard', [
            'stats' => [
                'products_count' => $productsCount,
                'balance' => $balance,
            ],
            'orders' => $invoices,
        ]);
    }
    public function invoices(Request $request)
    {
        $seller = $request->user()->seller;

        $products = $seller->products()->with(['invoiceItems.invoice.user'])->get();

        $invoices = $products->flatMap(function ($product) {
            return $product->invoiceItems->map(function ($item) use ($product) {
                return [
                    'id' => $item->invoice->id,
                    'invoice_code' => $item->invoice->invoice_code,
                    'product_name' => $product->name,
                    'quantity' => $item->quantity,
                    'amount' => $item->price * $item->quantity,
                    'status' => $item->invoice->status,
                    'buyer_name' => $item->invoice->user->name ?? 'N/A',
                    'created_at' => $item->invoice->created_at->format('Y-m-d H:i'),
                ];
            });
        })->sortByDesc('created_at')->values();

        return Inertia::render('seller/orders', [
            'orders' => $invoices
        ]);
    }
}
