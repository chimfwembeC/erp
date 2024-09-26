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
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->nullable(); // Reference number (e.g., invoice, receipt)
            $table->string('description')->nullable(); // Description of the transaction
            $table->decimal('total_debit', 15, 2); // Sum of all debits
            $table->decimal('total_credit', 15, 2); // Sum of all credits
            $table->timestamp('entry_date'); // When the entry was made
            $table->timestamps();
        });

        Schema::create('journal_entry_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('journal_entry_id')->constrained(); // Links to journal entries
            $table->foreignId('account_id')->constrained(); // Links to accounts
            $table->decimal('debit', 15, 2)->nullable(); // Debit amount for this item
            $table->decimal('credit', 15, 2)->nullable(); // Credit amount for this item
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
