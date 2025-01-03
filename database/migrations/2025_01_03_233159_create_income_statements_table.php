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
        Schema::create('income_statement', function (Blueprint $table) {
            $table->id();
            $table->decimal('revenue', 15, 2);
            $table->decimal('expenses', 15, 2);
            $table->decimal('net_income', 15, 2); // Revenue - Expenses
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_statement');
    }
};
