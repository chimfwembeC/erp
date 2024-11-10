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
        Schema::table('bank_reconciliations', function (Blueprint $table) {
            // Add new fields
            $table->decimal('opening_balance', 15, 2)->nullable()->after('bank_account_id');
            $table->decimal('closing_balance', 15, 2)->nullable()->after('opening_balance');
            $table->enum('status', ['pending', 'completed', 'in-progress'])->default('pending')->after('reconciliation_date');
            $table->text('adjustments')->nullable()->after('status');
            $table->text('notes')->nullable()->after('adjustments');
            $table->unsignedBigInteger('created_by')->nullable()->after('notes');
            $table->unsignedBigInteger('updated_by')->nullable()->after('created_by');
            
            // Add foreign key constraints (if applicable)
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bank_reconciliations', function (Blueprint $table) {
            $table->dropColumn([
                'opening_balance',
                'closing_balance',
                'status',
                'adjustments',
                'notes',
                'created_by',
                'updated_by',
            ]);
        });
    }
};
