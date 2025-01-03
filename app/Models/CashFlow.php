<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashFlow extends Model
{
     // Define the table name if it's different from the pluralized model name
     protected $table = 'cash_flows';

     // Define the fillable fields for mass assignment
     protected $fillable = [
         'type',
         'amount',
         'description',
         'account_id',
     ];
}
