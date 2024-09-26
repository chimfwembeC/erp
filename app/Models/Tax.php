<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    use HasFactory;
    protected $fillable = ['tax_name', 'rate', 'tax_type'];

    public function invoiceTaxes()
    {
        return $this->hasMany(InvoiceTax::class);
    }
}
