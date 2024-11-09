<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'supplier_id', 
        'total_amount', 
        'tax_amount', 
        'discount_amount', 
        'order_date', 
        'delivery_date', 
        'status'
    ];
}
