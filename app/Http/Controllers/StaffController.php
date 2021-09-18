<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use App\Http\Resources\StaffResource;

class StaffController extends Controller
{
    public function getAll() {
        return Staff::all();
    }
}
