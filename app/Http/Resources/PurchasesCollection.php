<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Models\Staff;
use App\Http\Resources\Client as ClientResource;
use App\Models\Client as ClientModel;
use App\Http\Resources\ClientCollection;



class PurchasesCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->transform(function($purchase) {
                return [
//                    'id' => $purchase->id,
                    'purchase_id' => $purchase->id,
                    'start' => Carbon::createFromFormat('Y-m-d H:i:s', $purchase->register_date, 'Asia/Almaty')->format('c'),
                    'end' => Carbon::createFromFormat('Y-m-d H:i:s', $purchase->service_end_date, 'Asia/Almaty')->format('c'),
                    'resourceId' => $purchase->staff_id,
                    'title' => $purchase->client_id,
                    'client' => $purchase->client,
                    'service' => $purchase->services,
                    'staff' => $purchase->staff
                ];
            })
        ];
    }
}
