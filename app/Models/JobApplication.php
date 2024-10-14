<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    // Specify the fillable properties to allow mass assignment
    protected $fillable = [
        'posted_job_id', // The job the application is for
        'user_id',       // The user applying for the job
        'resume',        // URL or path to the applicant's resume
        'cover_letter',  // Optional cover letter
        'status',        // Application status (e.g., pending, accepted, rejected)
    ];

    // Define the relationship with the PostedJob model
    public function postedJob()
    {
        return $this->belongsTo(PostedJob::class, 'posted_job_id');
    }

    // Define the relationship with the User model
    public function applicant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
