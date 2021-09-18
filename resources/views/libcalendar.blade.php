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
        <div id="calendar"></div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="calendarNewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <input readonly type="text" class="form-control" id="staff_name" value="" placeholder="имя работника" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Время записи</label>
                            <input readonly type="text" class="form-control" id="register_time" name="register_date" placeholder="время записи" />
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
                                    <option value="{{$service->id}}" data-taketime="{{$service->takeTime}}" data-price="{{$service->price}}">{{$service->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Процедура закончиться</label>
                            <input type="text" class="form-control" id="end_date" name="service_end_date" placeholder="Процедура закончиться" />
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
<script src="{{ asset('js/calendar.js') }}"></script>
</body>
</html>
