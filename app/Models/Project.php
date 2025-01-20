<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'owner_id'];

    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function issues()
    {
        return $this->hasMany(Issue::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
