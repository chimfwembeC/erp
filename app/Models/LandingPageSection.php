<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPageSection extends Model
{
    use HasFactory;
    protected $fillable = ['landing_page_id', 'section_id', 'custom_data'];

    // Relationships
    public function landingPage()
    {
        return $this->belongsTo(LandingPages::class,'landing_page_id');
    }

    public function section()
    {
        return $this->belongsTo(Sections::class, 'section_id');
    }
}
