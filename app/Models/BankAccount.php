<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;
    protected $fillable = ['account_name', 'account_number', 'current_balance'];  

      // Define the relationship with BankReconciliation
      public function bankReconciliations()
      {
          return $this->hasMany(BankReconciliation::class);
      }
}
