<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    use HasFactory;
    protected $fillable = ['section_id', 'content_type', 'content', 'position'];

    // Relationships
    public function section()
    {
        return $this->belongsTo(Sections::class, 'section_id');
    }
}
