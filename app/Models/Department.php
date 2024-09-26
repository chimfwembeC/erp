<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'manager_id', 'department_group_id'];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

     public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function employees()
    {
        return $this->hasMany(User::class)->where('role', 'employee');
    }

    public function departmentGroup()
    {
        return $this->belongsTo(DepartmentGroup::class);
    }
}
