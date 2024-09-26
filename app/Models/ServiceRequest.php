<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [	'user_id', 'request_details' ,'status' ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
