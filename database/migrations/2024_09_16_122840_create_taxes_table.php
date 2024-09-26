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
        Schema::create('taxes', function (Blueprint $table) {
            $table->id();
            $table->string('tax_name'); // e.g., VAT, GST
            $table->decimal('rate', 5, 2); // Tax rate as a percentage
            $table->string('tax_type'); // e.g., 'sales', 'purchase'
            $table->timestamps();
        });
        
        Schema::create('invoice_taxes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained('sales_invoices');
            $table->foreignId('tax_id')->constrained('taxes');
            $table->decimal('tax_amount', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxes');
    }
};
