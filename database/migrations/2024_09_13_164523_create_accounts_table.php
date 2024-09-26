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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->string('account_type'); // e.g., 'asset', 'liability', 'equity', 'income', 'expense'
            $table->string('account_number')->unique(); // Unique identifier for the account
            $table->foreignId('parent_account_id')->nullable()->constrained('accounts'); // For hierarchical COA
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
