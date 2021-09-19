require('./bootstrap');
import {Calendar} from '@fullcalendar/core';
import resourceTimeGridPlugin  from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {plusTime, pT, select, parseTime, timeToDateTime, parseDateToTime, parseT} from './utils'

const calendarEl = document.querySelector('#calendar');
const modalEl = document.querySelector('#calendarNewModal' );
const modal = new bootstrap.Modal( modalEl,{ keyboard: false });

const inputStaff = modalEl.querySelector('#staff_name');
const inputRegisterTime = modalEl.querySelector('#register_time');
const inputStaffId = modalEl.querySelector('[name="staff_id"]');

const form = document.querySelector('#purchase_form');
const serviceSelect = form.querySelector('#services');
const clientSelect = form.querySelector('#clients');
const price = form.querySelector('#price');
const endTimeInput = form.querySelector('#end_date');
const serviceStartDate = form.querySelector('#register_time');
const purchases_id = form.querySelector('#purchases');

const formRemove = document.querySelector('#purchase_remove');
const formSubmit = document.querySelector('#form_submit');


serviceSelect.addEventListener('change', changeServiceSelect);


formSubmit.addEventListener('click', saveData)
formRemove.addEventListener('click', removeData);


const calendar = new Calendar(calendarEl, {
    plugins: [ resourceTimeGridPlugin, interactionPlugin ],
    initialView: 'resourceTimeGridDay',
    locale: 'ru',
    selectable: true,
    allDaySlot: false,
    height: '700px',
    resources: (fetchInfo, successCallback, failureCallback) => {
        axios
            .get('/newcalendar/staffs')
            .then(({data}) => successCallback(data.data))
            .catch(failureCallback);
    },
    slotMinTime: '08:00:00',
    slotMaxTime: '23:00:00',
    slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
    },
    dateClick: ({resource, date}) => {
        const {id, title} = resource;
        inputStaff.value = title;
        inputStaffId.value = id;
        inputRegisterTime.value = parseDateToTime(date);
        clearModalForm();
        formSubmit.disabled = false;
        formRemove.hidden = true;
        modal.toggle();
    },
    eventClick: ({event}) => {
        fillModal(
            {
                ...event.extendedProps,
                startTime: event.start,
                endTime: event.end
            });
        modal.toggle();
    },
    events: (fetchInfo, successCallback, failureCallback) => {
        axios
            .get('/newcalendar/purchases')
            .then(({data}) => {
                console.log('EventsData: ', data);
                successCallback(data.data);
            })
            .catch(failureCallback);
    },
    eventContent: (arg) => {
        const container = document.createElement('div');
        container.className = 'eventContainer';
        const timeTextEl = document.createElement('i');
        // const clientNameEl = document.createElement('p');
        // const serviceNameEl = document.createElement('p');
        // const servicePriceEl = document.createElement('p');

        // const {client, service} = arg.event.extendedProps;

        // clientNameEl.innerHTML = 'Клиент: ' + client.name;
        // serviceNameEl.innerHTML = 'Услуга: ' + service.name;
        // servicePriceEl.innerHTML = 'Цена: ' + service.price;
        timeTextEl.innerHTML = 'Время: ' + arg.timeText;
        container.appendChild(timeTextEl);
        // container.appendChild(clientNameEl);
        // container.appendChild(serviceNameEl);
        // container.appendChild(servicePriceEl);

        let arrayOfDomNodes = [container];
        return { domNodes: arrayOfDomNodes }
    },
});

calendar.render();


function saveData(event) {
    event.preventDefault();
    event.currentTarget.disabled = true;

    const formData = new FormData(form);

    const time = formData.get('register_date');
    const end_time = formData.get('service_end_date');

    formData.set('register_date', timeToDateTime(time));
    formData.set('service_end_date', timeToDateTime(end_time));
    console.log('Form: ', formData);
    axios.post('/newcalendar', formData)
        .then((response ) => {
            console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            modal.toggle();
            calendar.refetchEvents();
        });
}

function removeData(event){
    event.preventDefault();
    formSubmit.disabled = true;
    event.currentTarget.disabled = true;

    const formData = new FormData(form);
    const id = formData.get('purchases_id');
    axios.delete('/newcalendar', {
        data: {id}
    })
        .then((res) => console.log(res))
        .catch((e) => console.log('ErrorMessage: ', e))
        .finally(() => {
            modal.toggle();
            calendar.refetchEvents();
        });
}

function changeServiceSelect(event) {
    const $elem = event.currentTarget;
    const $selectedOption = $elem.selectedOptions.item(0);
    const takeTime = $selectedOption.dataset.taketime;
    const priceValue = $selectedOption.dataset.price;

    const serviceEndDate = plusTime(takeTime, serviceStartDate.value);
    endTimeInput.value = serviceEndDate ?? '';
    price.value = priceValue ?? '';
}

function fillModal(props) {
    price.value = props.service['price'];
    serviceStartDate.value = `${pT(props.startTime.getHours())}:${pT(props.startTime.getMinutes())}:${pT(props.startTime.getSeconds())}`;
    endTimeInput.value = `${pT(props.endTime.getHours())}:${pT(props.endTime.getMinutes())}:${pT(props.endTime.getSeconds())}`;
    purchases_id.value = props['purchase_id'];
    inputStaff.value = props.staff.name;
    select(clientSelect, props.client.id);
    select(serviceSelect, props.service.id);
    formSubmit.disabled = false;
    formRemove.disabled = false;
    formRemove.hidden = false;
}

function errorResponse(err){
    console.log('Error message: ', err);
}

function clearModalForm() {
    select(serviceSelect, 'none');
    select(clientSelect, 'none');
    price.value = '';
    endTimeInput.value = '';
    purchases_id.value = '';
}


