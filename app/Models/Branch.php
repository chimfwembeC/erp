<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'location', 'description', 'manager_id'];  

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'branch_department');
    }

    public function employees()
    {
        return $this->hasMany(User::class, 'branch_id')->where('role', 'employee');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id')->where('role', 'manager');
    }
}
