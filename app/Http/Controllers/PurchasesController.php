<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchases;
use Illuminate\Support\Facades\Redirect;

class PurchasesController extends Controller
{
    public function store(Request $request) {
        if ($request->get('purchases_id'))
        {
            Purchases::findOrFail($request->get('purchases_id'))->update($request->all());
        }else{
            Purchases::create($request->all());
        }
    }

    public function remove(Request $request) {
        if($request->get('id')) Purchases::findOrFail($request->get('id'))->delete();
    }
}
