<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;
    protected $fillable = ['account_id', 'budgeted_amount', 'actual_amount', 'fiscal_year'];  

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
