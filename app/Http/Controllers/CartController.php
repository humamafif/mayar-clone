<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;

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

        return redirect()->back()->with('message', 'Product added to cart!');
    }

    public function getCart()
    {
        $userId =  Auth::id();
        $cart = Cart::with('product')
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->get();

        return response()->json($cart);
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

        return redirect()->back()->with('success', 'Product cancelled successfully!');
    }

    public function remove($id)
    {
        Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return redirect()->route('home')->with('message', 'Product removed from cart!');
    }
}
