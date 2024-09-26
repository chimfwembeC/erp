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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Branch name (e.g., New York Office, London Office)
            $table->string('location'); // Location or address of the branch
            $table->text('description')->nullable(); // Description about the branch
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null'); // Branch manager (User table foreign key)
            $table->softDeletes();  // Soft deletes added
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
