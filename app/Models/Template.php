<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug', 'layout', 'is_active'];

    // Relationships
    public function sections()
    {
        return $this->hasMany(Sections::class);
    }

    public function variables()
    {
        return $this->hasMany(TemplateVariable::class);
    }

    public function landingPages()
    {
        return $this->hasMany(LandingPages::class);
    }

    public function media()
    {
        return $this->belongsToMany(Media::class, 'media_templates');
    }
}
