<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use App\Models\Invoice;
use App\Models\InvoiceItem;

class InvoiceController extends Controller
{
    public function __construct()
    {
        Configuration::setXenditKey(config('xendit.API_KEY'));
    }

    public function index()
    {
        $invoices = Invoice::with('items', 'items.product')
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')->get();
        return Inertia::render('order/index', compact('invoices'));
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $carts = Cart::with('product')->where([['user_id', $userId], ['status', 'active']])->get();

            if ($carts->isEmpty()) {
                return response()->json(['message' => 'Keranjang belanja kosong'], 400);
            }

            $items = array();
            $amount = 0;
            foreach ($carts as $cart) {
                $items[] = [
                    'name' => $cart->product->name,
                    'price' => $cart->product->price,
                    'quantity' => $cart->quantity,
                ];
                $amount += $cart->product->price * $cart->quantity;
            }

            // Generate kode invoice unik
            $invoice_code = IdGenerator::generate([
                'table' => 'invoices',
                'field' => 'invoice_code',
                'length' => 11,
                'prefix' => 'INV-' . date('y'),
                'reset_on_prefix_change' => true,
            ]);

            // Buat satu invoice untuk seluruh transaksi
            $invoice = Invoice::create([
                'user_id' => $userId,
                'external_id' => $invoice_code,
                'invoice_code' => $invoice_code,
                'amount' => $amount,
                'status' => 'pending',
            ]);

            // Request create invoice ke Xendit
            $xendit_create_invoice = new CreateInvoiceRequest([
                'external_id' => $invoice_code,
                'amount' => $amount,
                'items' => $items,
                'customer' => [
                    'given_names' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
                'success_redirect_url' => route('order.show', ['id' => $invoice->id]),
                'failure_redirect_url' => route('order.show', ['id' => $invoice->id]),
            ]);

            $xendit_api_instance = new InvoiceApi();
            $xendit_invoice = $xendit_api_instance->createInvoice($xendit_create_invoice);

            // Update invoice dengan URL pembayaran
            $invoice->update([
                'invoice_url' => $xendit_invoice['invoice_url'],
            ]);

            // Buat InvoiceItem untuk setiap produk
            foreach ($carts as $cart) {
                // Update status cart dan stok produk
                $cart->update(['status' => 'ordered']);
                $cart->product->update(['stock' => $cart->product->stock - $cart->quantity]);

                // Buat InvoiceItem, bukan Invoice baru
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->product->price,
                ]);
            }

            DB::commit();
            return response()->json([
                'url' => $xendit_invoice['invoice_url']
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        $invoice = Invoice::with('items', 'items.product')->findOrFail($id);

        return Inertia::render('order/show', compact('invoice'));
    }


    public function callbackXendit(Request $request)
    {
        $getToken = $request->header('x-callback-token');
        $callbackToken = config('xendit.CALLBACK_TOKEN');

        if ($getToken !== $callbackToken) {
            Log::warning('Xendit Callback: Invalid token');
            return response()->json(['message' => 'unauthorized'], 401);
        }

        $invoice = Invoice::where('external_id', $request->external_id)->first();

        if (!$invoice) {
            Log::warning('Xendit Callback: invoice not found for external_id: ' . $request->external_id);
            return response()->json(['message' => 'invoice not found'], 404);
        }

        if ($invoice->status !== 'pending') {
            dd('Invoice already processed: ' . $invoice->status);
            return response()->json(['message' => 'invoice already processed'], 200);
        }

        $paid_at = $request->paid_at ? date('Y-m-d H:i:s', strtotime($request->paid_at)) : now();

        $invoice->update([
            'paid_at' => $paid_at,
            'status' => ($request->status === 'PAID' || $request->status === 'SETTLED') ? 'paid' : 'failed',
            'payment_method' => $request->payment_method ?? null,
            'payment_channel' => $request->payment_channel ?? null,
        ]);

        // tambahkan saldo seller
        if ($invoice->status === 'paid') {
            foreach ($invoice->items as $item) {
                $product = $item->product;
                if ($product && $product->seller) {
                    $amount = $item->price * $item->quantity;
                    $product->seller->increment('balance', $amount);
                    Log::info("Saldo seller #{$product->seller->id} bertambah Rp {$amount} dari invoice {$invoice->invoice_code}");
                }
            }

            // if ($seller) {
            //     $seller->increment('balance', $invoice->amount);
            //     Log::info("Saldo seller #{$seller->id} bertambah Rp {$invoice->amount} dari invoice {$invoice->invoice_code}");
            // } else {
            //     Log::warning("Tidak ditemukan seller untuk order #{$invoice->id}");
            // }
        }

        return response()->json(['message' => 'Success'], 200);
    }
}
