<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankReconciliation extends Model
{
    use HasFactory;

    protected $fillable = [
        'bank_account_id',       // Foreign key to the bank account
        'opening_balance',       // Opening balance for the period
        'closing_balance',       // Closing balance for the period
        'statement_balance',     // Statement balance from the bank statement
        'ledger_balance',        // Balance from the company's ledger
        'transaction_id',        // Foreign key to the associated transaction(s)
        'reconciliation_date',   // Date of the reconciliation
        'status',                // Status of the reconciliation (e.g., 'pending', 'completed')
        'adjustments',
        'created_by',
        'updated_by',           // Adjustments made (if applicable)
        'notes',                 // Any notes related to the reconciliation
    ];
     
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }


     public function bankAccount()
     {
         return $this->belongsTo(BankAccount::class);
     }

}
