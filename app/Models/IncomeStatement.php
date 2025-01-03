<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeStatement extends Model
{
    protected $table = 'income_statement'; // The table name

    protected $fillable = [
        'revenue',
        'expenses',
        'net_income', // Revenue - Expenses
    ];
}
