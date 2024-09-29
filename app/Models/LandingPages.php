<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPages extends Model
{
    use HasFactory;

    protected $fillable = ['template_id', 'title', 'slug', 'custom_data', 'is_published', 'html','css'];

    // Relationships
    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function sections()
    {
        return $this->hasMany(LandingPageSection::class);
    }
}
