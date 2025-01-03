<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCashFlowsTable extends Migration
{
    public function up()
    {
        Schema::create('cash_flows', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['inflow', 'outflow']); // Inflows or outflows
            $table->decimal('amount', 15, 2); // Amount of cash flow
            $table->string('description')->nullable(); // Description or notes
            $table->foreignId('account_id')->constrained(); // Foreign key for related account, assuming you have accounts in your system
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cash_flows');
    }
}
