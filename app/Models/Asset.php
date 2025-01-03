<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $table = 'assets'; // The table name

    protected $fillable = [
        'current_assets',
        'fixed_assets',
        'other_assets',
    ];
}
