<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OrderController;

// Route Webhook Xendit
Route::post('/xendit/callback', [OrderController::class, 'callbackXendit'])->name('xendit.webhook');
