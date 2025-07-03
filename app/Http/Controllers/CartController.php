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
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $request->product_id
            ],
            [
                'quantity' => DB::raw('quantity + 1')
            ]
        );

        return redirect()->back()->with('message', 'Produk berhasil ditambahkan ke keranjang.');
    }

    public function index()
    {
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems
        ]);
    }

    public function remove($id)
    {
        Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return redirect()->route('cart.index')->with('message', 'Produk dihapus dari keranjang');
    }

    public function checkout()
    {
        $user = Auth::user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Keranjang kosong');
        }

        $totalAmount = $cartItems->sum(fn ($item) => $item->product->price);

        Configuration::setXenditKey(config('services.xendit.secret_key'));
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
