<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Xendit\Configuration;
use Xendit\Invoice\CreateInvoiceRequest;
use Xendit\Invoice\InvoiceApi;
use App\Models\Invoice;


class OrderController extends Controller
{
    public function __construct()
    {
        Configuration::setXenditKey(config('xendit.API_KEY'));
    }

    public function index()
    {
        $orders = Order::with('product')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('order/index', compact('orders'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::beginTransaction();

        try {
            $product = Product::lockForUpdate()->findOrFail($request->product_id);

            if ($product->stock < $request->quantity) {
                return redirect()->back()->with('error', 'Stok produk tidak mencukupi.');
            }

            $amount = $product->price * $request->quantity;

            $order_code = IdGenerator::generate([
                'table' => 'orders',
                'field' => 'order_code',
                'length' => 11,
                'prefix' => 'ORD-' . date('y'),
                'reset_on_prefix_change' => true,
            ]);

            
            $order = Order::create([
                'user_id' => Auth::id(),
                'product_id' => $product->id,
                'quantity' => $request->quantity, 
                'order_code' => $order_code,    
                'amount' => $amount,
                'status' => 'pending',
            ]);

            $xenditInvoiceRequest = new CreateInvoiceRequest([
                'external_id' => $order_code,
                'amount' => $amount,
                'items' => [[
                    'name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $request->quantity,
                ]],
                'customer' => [
                    'given_names' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
                'success_redirect_url' => route('order.show', $order->id),
                'failure_redirect_url' => route('order.show', $order->id),
            ]);

            $xendit = new InvoiceApi();
            $invoice = $xendit->createInvoice($xenditInvoiceRequest);

            $order->update([
                'payment_url' => $invoice['invoice_url'],
            ]);

            $product->decrement('stock', $request->quantity);

            DB::commit();

            return response()->json([
                'invoice_url' => $invoice['invoice_url'],
            ]);
            

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Order Store Error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal membuat pembayaran. Silakan coba lagi.');
        }

        $user = Auth::user();

        if ($user->balance < $amount) {
            return redirect()->back()->with('error', 'Saldo tidak mencukupi.');
        }
        
        // Kurangi saldo
        $user->decrement('balance', $amount);
        
        // Simpan order
        Order::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'amount' => $amount,
            'order_code' => $order_code,
            'status' => 'paid',
        ]);
        
    }

    public function show($id)
    {
        $order = Order::with('product')->where('user_id', Auth::id())->findOrFail($id);
    
        return Inertia::render('order/show', [
            'order' => $order
        ]);
    }
    

    public function callbackXendit(Request $request)
    {
        $getToken = $request->header('x-callback-token');
        $callbackToken = config('xendit.CALLBACK_TOKEN');
    
        if ($getToken !== $callbackToken) {
            Log::warning('Xendit Callback: Invalid token');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $order = Order::where('order_code', $request->external_id)->first();
    
        if (!$order) {
            Log::warning('Xendit Callback: Order not found for external_id: ' . $request->external_id);
            return response()->json(['message' => 'Order not found'], 404);
        }
    
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Order already processed'], 200);
        }
    
        $paid_at = $request->paid_at ? date('Y-m-d H:i:s', strtotime($request->paid_at)) : now();
    
        $order->update([
            'paid_at' => $paid_at,
            'status' => in_array($request->status, ['PAID', 'SETTLED']) ? 'paid' : 'failed',
            'payment_method' => $request->payment_method ?? null,
            'payment_channel' => $request->payment_channel ?? null,
        ]);
    
        // tambahkan saldo seller
        if ($order->status === 'paid') {
            $seller = $order->product->seller;
    
            if ($seller) {
                $seller->increment('balance', $order->amount);
                Log::info("Saldo seller #{$seller->id} bertambah Rp {$order->amount} dari order {$order->order_code}");
            } else {
                Log::warning("Tidak ditemukan seller untuk order #{$order->id}");
            }
        }
    
        return response()->json(['message' => 'Success'], 200);
    }
    
}
