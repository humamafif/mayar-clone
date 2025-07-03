<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'order_code',
        'amount',
        'status',
        'payment_url',
        'payment_method',
        'payment_channel',
        'paid_at',
    ];

    /**
     * Mendapatkan produk yang terkait dengan pesanan.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Mendapatkan pengguna yang terkait dengan pesanan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
