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
      
        Schema::create('posted_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Job title
            $table->text('description'); // Job description
            $table->string('location')->nullable(); // Job location
            $table->decimal('salary', 10, 2)->nullable(); // Job salary (optional)
            $table->enum('job_type', ['full-time', 'part-time', 'contract', 'internship'])->default('full-time'); // Job type
            $table->date('deadline')->nullable(); // Application deadline
            $table->foreignId('employer_id')->constrained('users'); // The employer posting the job
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posted_jobs');
    }
};
