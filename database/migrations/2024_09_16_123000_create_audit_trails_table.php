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
        Schema::create('audit_trails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // The user who made the change
            $table->string('action'); // e.g., 'create', 'update', 'delete'
            $table->string('entity_type'); // e.g., 'invoice', 'payment'
            $table->foreignId('entity_id'); // ID of the entity that was modified
            $table->json('original_data')->nullable(); // Data before the change
            $table->json('changed_data')->nullable(); // Data after the change
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_trails');
    }
};
