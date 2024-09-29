<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sections extends Model
{
    use HasFactory;
    protected $fillable = ['template_id', 'name', 'position', 'type'];

    // Relationships
    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    public function contentBlocks()
    {
        return $this->hasMany(ContentBlock::class, 'section_id');
    }

    public function landingPageSections()
    {
        return $this->hasMany(LandingPageSection::class);
    }
}
