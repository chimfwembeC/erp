<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoice extends Model
{
    use HasFactory;
    // protected $table = 'invoices';
    protected $fillable = ['customer_id', 'total_amount', 'tax_amount', 'discount_amount', 'invoice_date', 'due_date', 'status'];

    public function customer()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'user_id');
    }
}
