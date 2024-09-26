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
        Schema::create('landing_pages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('template_id'); // References template
            $table->string('title'); // Landing page title
            $table->string('slug')->unique(); // URL-friendly identifier
            $table->json('custom_data')->nullable(); // JSON data for customizations
            $table->boolean('is_published')->default(false); // Published status
            $table->timestamps();
        
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_pages');
    }
};
