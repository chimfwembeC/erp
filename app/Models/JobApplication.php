<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    // Specify the fillable properties to allow mass assignment
    protected $fillable = [
        'job_id',
        'user_id',
        'applicant_name',
        'applicant_email',
        'phone_number',
        'linkedin_profile',
        'portfolio_url',
        'availability_date',
        'skills',
        'references',
        'source',
        'cover_letter',
        'resume_path',
        'status',
    ];

    // Define the relationship with the PostedJob model
    public function postedJob()
    {
        return $this->belongsTo(PostedJob::class, 'job_id');
    }

    // Define the relationship with the User model
    public function applicant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
