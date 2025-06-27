<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shop_name',
        'shop_description',
        'phone_number',
        'address',
        'id_card_number',
        'bank_name',
        'bank_account',
        'account_number',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
