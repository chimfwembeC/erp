<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalEntry extends Model
{
    use HasFactory;
    protected $fillable = ['reference', 'description', 'total_debit', 'total_credit', 'entry_date'];

    public function journalItems()
    {
        return $this->hasMany(JournalEntryItem::class);
    }
}
