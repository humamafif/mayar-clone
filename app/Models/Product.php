<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'seller_id',
        'image',
        'name',
        'description',
        'price',
        'stock',
        'file_path',
        'product_url',
    ];

    public function seller(): BelongsTo
    {
        return $this->belongsTo(Seller::class);
    }

    public function invoice(): HasMany
    {
        return $this->hasMany(Invoice
        ::class);
    }
    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }
    public function paidInvoiceItems()
    {
        return $this->hasMany(\App\Models\InvoiceItem::class)
            ->whereHas('invoice', function ($q) {
                $q->where('status', 'paid');
            });
    }
}
