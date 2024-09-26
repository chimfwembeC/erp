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
        
        Schema::create('department_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Name of the department group, e.g., "Operations"
            $table->string('description')->nullable();
            $table->softDeletes();  // Soft deletes added
            $table->timestamps();
        });

        // Updating the departments table to include a department_group_id
        Schema::table('departments', function (Blueprint $table) {
            $table->unsignedBigInteger('department_group_id')->nullable();
            $table->foreign('department_group_id')->references('id')->on('department_groups');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['department_group_id']);
            $table->dropColumn('department_group_id');
        });

        Schema::dropIfExists('department_groups');
    }
};
