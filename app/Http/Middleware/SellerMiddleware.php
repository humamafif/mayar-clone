<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class SellerMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role === 'seller') {
            return $next($request);
        }

        return Redirect::route('home')->with('error', 'Anda tidak memiliki akses ke halaman tersebut.');
    }
}
