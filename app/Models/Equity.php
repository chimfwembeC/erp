<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equity extends Model
{
    protected $table = 'equities'; // The table name

    protected $fillable = [
        'owner_equity',
        'retained_earnings',
        'shareholder_equity',
    ];
}
