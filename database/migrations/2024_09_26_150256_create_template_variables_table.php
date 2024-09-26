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
        Schema::create('template_variables', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('template_id'); // References template
            $table->string('key'); // Variable key (e.g., 'button_color', 'font_style')
            $table->string('value'); // Value for the variable
            $table->timestamps();
        
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_variables');
    }
};
