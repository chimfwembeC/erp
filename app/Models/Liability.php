<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Liability extends Model
{
    protected $table = 'liabilities'; // The table name

    protected $fillable = [
        'short_term_liabilities',
        'long_term_liabilities',
        'other_liabilities',
    ];
}
