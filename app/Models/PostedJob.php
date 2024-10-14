<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostedJob extends Model
{
    use HasFactory;

    // Define the table if it's not the plural form of the model name
    protected $table = 'posted_jobs';

    // Specify the fillable properties to allow mass assignment
    protected $fillable = [
        'title',
        'description',
        'location',
        'salary',
        'job_type',
        'deadline',
        'employer_id',
    ];

    // Cast attributes to their appropriate types
    protected $casts = [
        'salary' => 'decimal:2', // Store salary as decimal with 2 decimal points
        'deadline' => 'date', // Cast deadline to date
    ];

    // Define the relationship with the Employer (User) model
    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    // You can add other relationships here, e.g., job applications
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
