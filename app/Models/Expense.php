<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
        // Define the table name if it's different from the pluralized model name
        protected $table = 'expenses';

        // Define the fillable fields for mass assignment
        protected $fillable = [
            'category',
            'amount',
            'date',
            'description',
        ];
}
