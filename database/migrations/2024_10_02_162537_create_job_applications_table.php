<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('posted_jobs')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('applicant_name'); // Applicant's name
            $table->string('applicant_email'); // Applicant's email
            $table->string('phone_number')->nullable(); // Phone number (optional)
            $table->string('linkedin_profile')->nullable(); // LinkedIn profile (optional)
            $table->string('portfolio_url')->nullable(); // Portfolio URL (optional)
            $table->date('availability_date')->nullable(); // Availability date (optional)
            $table->text('skills')->nullable(); // Skills (optional, could use JSON if needed)
            $table->text('references')->nullable(); // References (optional)
            $table->string('source')->nullable(); // How the applicant heard about the job (optional)
            $table->text('cover_letter')->nullable();
            $table->string('resume_path')->nullable();
            $table->enum('status', ['pending', 'interviewed', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
