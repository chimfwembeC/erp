<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartmentGroupLink extends Model
{
    use HasFactory;

    protected $fillable = ['department_group_id','department_id','description'];
    protected $table = 'department_group_links';

    public function department_group()
    {
        return $this->belongsTo(DepartmentGroup::class);
    }

    public function departments()
    {
        return $this->belongsTo(Department::class);
    }

}
