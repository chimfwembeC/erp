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
        Schema::create('department_group_links', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('department_group_id')
                ->constrained('department_groups') // References 'id' in 'department_groups'
                ->onDelete('cascade'); // Cascade deletes for linked department groups
            $table->foreignId('department_id')
                ->constrained('departments') // References 'id' in 'departments'
                ->onDelete('cascade'); // Cascade deletes for linked departments
            $table->string('description')->nullable(); // Optional description of the relationship
            $table->timestamps(); // Adds 'created_at' and 'updated_at'

            // Prevent duplicate links
            $table->unique(['department_group_id', 'department_id'], 'unique_group_department');

            // Indexes for faster lookups
            $table->index('department_group_id', 'index_department_group');
            $table->index('department_id', 'index_department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_group_links');
    }
};
