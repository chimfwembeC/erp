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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., HR, Finance, Sales
            $table->text('description')->nullable(); // Description of the department
            $table->foreignId('manager_id')->nullable()->constrained('users')->onDelete('set null'); // Department manager (User table foreign key)
            $table->softDeletes();  // Soft deletes added
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
