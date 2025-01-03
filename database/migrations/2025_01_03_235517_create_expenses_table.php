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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // Category of the expense (e.g., 'Rent', 'Utilities')
            $table->decimal('amount', 15, 2); // Amount of the expense
            $table->date('date'); // Date when the expense occurred
            $table->text('description')->nullable(); // Optional description for the expense
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
