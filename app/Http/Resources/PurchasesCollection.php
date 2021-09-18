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
                    'client' => ClientModel::findOrFail($purchase->client_id),
                    'total_price' => $purchase->total_price,
                    'service_id' => $purchase->services_id,
                    'staff' => new StaffResource(Staff::find($purchase->staff_id))
                ];
            })
        ];
    }
}
