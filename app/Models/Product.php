<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'sku', 'description', 'price', 'quantity','stock'];

    public function warehouses() {
        // return $this->belongsToMany(ProductWarehouse::class)->withPivot('quantity');
        return $this->belongsToMany(Warehouse::class, 'product_warehouse');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function inventory()
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
