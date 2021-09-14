<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('services_id');
            $table->foreign('services_id')->references('id')->on('services');
            $table->unsignedBigInteger('staff_id');
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('client');
            $table->dateTime('register_date');
            $table->integer('total_price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases');
    }
}
