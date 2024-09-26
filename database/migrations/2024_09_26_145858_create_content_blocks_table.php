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
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('section_id'); // References section
            $table->string('content_type'); // Type of content (e.g., 'text', 'image', 'video')
            $table->longText('content')->nullable(); // Content itself (could be text, a URL, or HTML)
            $table->integer('position')->default(0); // Position within section
            $table->timestamps();
        
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
    }
};
