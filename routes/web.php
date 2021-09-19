<?php

use Illuminate\Support\Facades\Route;
use App\Models\Client;
use App\Models\Staff;
use App\Models\Purchases;
use App\Models\Services;
use App\Http\Controllers\PurchasesController;
use App\Http\Resources\StaffCollection;
use App\Http\Resources\PurchasesCollection;
use App\Http\Resources\PurchasesResourse;
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
        'purchases' => Purchases::with(['services', 'staff', 'client'])->get(),
        'services' => Services::all()
        ]);
});

Route::post('/calendar', [PurchasesController::class, 'store']);
Route::DELETE('/calendar', [PurchasesController::class, 'remove']);

Route::GET('/newcalendar', function () {
     return view('libcalendar', [
         'clients' => Client::all(),
         'staffs' => Staff::all(),
         'services' => Services::all()
     ]);
});

Route::GET('/newcalendar/staffs', function() {
    return new StaffCollection(Staff::all());
});

Route::GET('/newcalendar/purchases', function() {
    return new PurchasesCollection(Purchases::with(['services', 'staff', 'client'])->get());
});

Route::POST('/newcalendar', [PurchasesController::class, 'store']);
Route::DELETE('/newcalendar', [PurchasesController::class, 'remove']);
