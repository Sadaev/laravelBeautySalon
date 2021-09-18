<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Carbon\Carbon;
use App\Http\Resources\Client as ClientResource;
use App\Models\Client;

class PurchasesResourse extends ResourceCollection
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
            'id' => $this->id,
            'staff' => StaffResource::collection($this->staff_id),
            'title' => new ClientResource(Client::findOrFail($this->client_id)),
            'start' => Carbon::createFromFormat('Y-m-d H:i:s', $this->register_date)->format('c'),
            'total_price' => '$this->total_price',
            'end' => Carbon::createFromFormat('Y-m-d H:i:s', $this->service_end_date)->format('c'),
            'resource' => $this->staff_id
        ];
    }
}
