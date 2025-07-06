<?php

use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;

// Route Webhook Xendit
Route::post('/xendit/callback', [InvoiceController::class, 'callbackXendit'])->name('xendit.webhook');
