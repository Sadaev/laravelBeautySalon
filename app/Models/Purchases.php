<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchases extends Model
{
    use HasFactory;

    protected $table = 'purchases';
    protected $fillable = ['register_date', 'total_price', 'client_id', 'staff_id', 'services_id'];
}
