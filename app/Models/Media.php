<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    protected $fillable = ['url', 'type'];

    // Relationships
    public function templates()
    {
        return $this->belongsToMany(Template::class, 'media_templates');
    }
}
