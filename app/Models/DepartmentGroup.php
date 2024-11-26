<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentGroup extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'department_group_links');
    }
}
