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
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('template_id'); // References template
            $table->string('name'); // Section name (e.g., "Hero", "Features")
            $table->integer('position')->default(0); // Position in template
            $table->string('type'); // Section type (e.g., "text", "image", "slider")
            $table->timestamps();
        
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
