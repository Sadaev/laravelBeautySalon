<?php

use Illuminate\Support\Facades\Route;
use App\Models\Client;
use App\Models\Staff;
use App\Models\Purchases;
use App\Models\WorkingHours;
use App\Models\Services;
use App\Http\Controllers\PurchasesController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/calendar', function () {
    return view('calendar', [
        'clients' => Client::all(),
        'staffs' => Staff::all(),
        'purchases' => Purchases::all(),
        'working_hours' => WorkingHours::all(),
        'services' => Services::all()
        ]);
});

Route::post('/calendar/update', [PurchasesController::class, 'store']);
