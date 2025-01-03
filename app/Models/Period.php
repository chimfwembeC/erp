<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $table = 'periods'; // The table name

    protected $fillable = [
        'start_date',
        'end_date',
        'description', // Optionally add any description or name for the period
    ];

    // If the `Period` model has any relationships, you can define them here
    // Example:
    // public function assets()
    // {
    //     return $this->hasMany(Asset::class);
    // }
}
