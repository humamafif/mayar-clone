<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Invoice;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use Inertia\Inertia;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        $userId =  Auth::id();

        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $request->product_id)
            ->where('status', 'active')
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'status' => 'active',
            ]);
        }

        return redirect()->back()->with('message', 'Produk berhasil ditambahkan ke keranjang.');
    }

    public function getCart()
    {
        if (!Auth::check()) {
            return response()->json([], 200); // Kembalikan array kosong jika belum login
        }

        $userId =  Auth::id();
        $cart = Cart::with('product')
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->get();

        return response()->json($cart);
    }

    public function index()
    {
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems
        ]);
    }

    public function cancel($id)
    {
        $userId = Auth::id();
        $cartItem = Cart::where('id', $id)
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->firstOrFail();

        $cartItem->status = 'cancelled';
        $cartItem->save();

        return redirect()->back()->with('success', 'Produk berhasil dihapus dari keranjang!');
    }

    public function remove($id)
    {
        Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return redirect()->route('home')->with('message', 'Produk dihapus dari keranjang');
    }

    public function checkout()
    {
        $user = Auth::user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('home')->with('error', 'Keranjang kosong');
        }

        $totalAmount = $cartItems->sum(fn($item) => $item->product->price);

        // Configuration::setXenditKey(config('services.xendit.secret_key'));
        $apiInstance = new InvoiceApi();
        $externalId = 'invoice-' . time();

        $createInvoiceRequest = new CreateInvoiceRequest([
            'external_id' => $externalId,
            'payer_email' => $user->email,
            'description' => 'Pembayaran Produk Digital',
            'amount' => $totalAmount,
            'success_redirect_url' => route('order.success'),
            'failure_redirect_url' => route('order.failure'),
        ]);

        $invoice = $apiInstance->createInvoice($createInvoiceRequest);

        Invoice::create([
            'user_id' => $user->id,
            'external_id' => $externalId,
            'amount' => $totalAmount,
            'status' => 'PENDING',
            'invoice_url' => $invoice['invoice_url'],
        ]);

        Cart::where('user_id', $user->id)->delete();

        return redirect($invoice['invoice_url']);
    }
}
