<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchases;

class PurchasesController extends Controller
{
    public function store(Request $request) {
        Purchases::create($request->all());
    }
}
