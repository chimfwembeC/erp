<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateVariable extends Model
{
    use HasFactory;
    protected $fillable = ['template_id', 'key', 'value'];

    // Relationships
    public function template()
    {
        return $this->belongsTo(Template::class);
    }
}
