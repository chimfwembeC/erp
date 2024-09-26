<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GeneralLedger extends Model
{
    use HasFactory;
    protected $table = 'general_ledger';
    protected $fillable = ['account_id', 'user_id', 'debit', 'credit', 'description', 'transaction_date'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
