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
        Schema::create('general_ledger', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained(); // Links to accounts
            $table->foreignId('user_id')->constrained(); // Links to the user who made the entry
            $table->decimal('debit', 15, 2)->nullable(); // Debit amount
            $table->decimal('credit', 15, 2)->nullable(); // Credit amount
            $table->string('description')->nullable(); // Brief explanation of the transaction
            $table->timestamp('transaction_date'); // When the transaction occurred
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_ledgers');
    }
};
