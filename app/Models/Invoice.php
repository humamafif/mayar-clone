<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'invoice_code',
        'amount',
        'status',
        'invoice_url',
    ];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function items()
    {
        return
            $this->hasMany(InvoiceItem::class);
    }
}
