<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;
    
    protected $fillable = [ 'user_id' ,'lead_status' ,'follow_up_date'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
