<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Beauty Salon</title>
    <link rel="stylesheet" href="{{ asset('css/app.css')}}">
</head>
<body>
    <header class="">
        <div class="container text-center p-5">
            <h2>Салон красоты</h2>
        </div>
    </header>
    <main>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    @foreach($staffs as $staff)
                        <th scope="col">{{ $staff->name }}</th>
                    @endforeach
                </tr>
                </thead>
                <tbody>

                    <tr>
                        <th scope="row">{{\Carbon\Carbon::createFromFormat("H:i:s", $time->time)->format('h:i')}}</th>
                        @foreach($staffs as $staff)
                            <td class="cell" data-staffid="{{$staff->id}}" data-staffname="{{$staff->name}}"  data-time="{{\Carbon\Carbon::createFromFormat("H:i:s", $time->time)->format('h:i')}}">
                                @foreach($purchases as $purchase)
                                    @if($purchase->staff_id === $staff->id && \Carbon\Carbon::createFromFormat("Y-m-d H:i:s", $purchase->register_date)->format('h:i') == \Carbon\Carbon::createFromFormat("H:i:s", $time->time)->format('h:i'))
                                        <div class="registerInfo" data-purchaseid="{{$purchase->id}}">
                                            <div class="client" data-client="name" data-clientid="{{$purchase->client_id}}">
                                                <p>Клиент: {{$purchase->client->name}}</p>
                                            </div>
                                            <div class="service_name" data-service="name" data-serviceid="{{$purchase->services_id}}">
                                                <p>Услуга: {{$purchase->services->name}}</p>
                                            </div>
                                            <div class="service_price" data-service="price" data-price="{{$purchase->services->price}}">
                                                <p>Цена: {{$purchase->services->price}}</p>
                                            </div>
                                        </div>
                                    @endif
                                @endforeach
                            </td>
                        @endforeach
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="calendarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Запись</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
{{--                        action="{{ url('/calendar/update') }}" method="post"--}}
                        <form id="purchase_form">
                            <input type="hidden" name="purchases_id" id="purchases">
                            <div class="mb-3">
                                <label class="form-label">Имя работника</label>
                                <input type="hidden" name="staff_id" value="">
                                <input type="text" class="form-control" id="staff_name" value="" placeholder="имя работника" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Время записи</label>
                                <input type="text" class="form-control" id="time" name="register_date" placeholder="время записи" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Клиент</label>
                                <select type="text" class="form-control" id="clients" name="client_id" placeholder="Имя клиента">
                                    <option value="none" selected>Выберите клиента</option>
                                    @foreach($clients as $client)
                                        <option value="{{$client->id}}">{{$client->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Услуга</label>
                                <select type="text" class="form-control" id="services" name="services_id" placeholder="услуга">
                                    <option value="none" selected>Выберите услугу</option>
                                    @foreach($services as $service)
                                        <option value="{{$service->id}}" data-price="{{$service->price}}">{{$service->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Цена</label>
                                <input type="text" class="form-control" id="price" name="total_price" placeholder="цена" />
                            </div>
                        </form>
                        <div class="modal-footer d-block">
                            <button type="submit" id="form_submit" class="btn btn-success float-end">сохранить</button>
                            <button type="button" class="btn btn-secondary float-end" data-bs-dismiss="modal">отмена</button>
                            <button type="button" class="btn btn-danger" hidden id="purchase_remove">удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
