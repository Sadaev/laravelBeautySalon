<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Services;
use App\Models\Client;
use App\Models\Staff;

class Purchases extends Model
{
    use HasFactory;

    protected $table = 'purchases';
    protected $fillable = ['register_date', 'total_price', 'client_id', 'staff_id', 'services_id', 'service_end_date'];

    public function services()
    {
        return $this->belongsTo(Services::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
