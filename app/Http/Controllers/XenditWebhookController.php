<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;

class XenditWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();

        if (isset($payload['id']) && $payload['status'] === 'PAID') {
            $invoice = Invoice::where('xendit_invoice_id', $payload['id'])->first();

            if ($invoice) {
                $invoice->status = 'paid';
                $invoice->save();
            }
        }

        return response()->json(['message' => 'Webhook received'], 200);
    }
}
