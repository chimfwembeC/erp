<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'issue_id', 'title', 'description', 'due_date', 'assignee_id', 'status'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function issue()
    {
        return $this->belongsTo(Issue::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }
}
