require('./bootstrap');
import {Calendar} from '@fullcalendar/core';
import resourceTimeGridPlugin  from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarEl = document.querySelector('#calendar');
const modalEl = document.querySelector('#calendarNewModal' );
const modal = new bootstrap.Modal( modalEl,{ keyboard: false });

const inputStaff = modalEl.querySelector('#staff_name');
const inputRegisterTime = modalEl.querySelector('#register_time');
const inputStaffId = modalEl.querySelector('[name="staff_id"]');

const form = document.querySelector('#purchase_form');
const formSubmit = document.querySelector('#form_submit');
const serviceSelect = form.querySelector('#services');
const formRemove = document.querySelector('#purchase_remove');
const clientSelect = form.querySelector('#clients');
const price = form.querySelector('#price');
const endTimeInput = form.querySelector('#end_date');
const serviceStartDate = form.querySelector('#register_time');
const purchases_id = form.querySelector('#purchases');

formSubmit.addEventListener('click', saveData)

formRemove.addEventListener('click', removeData);

serviceSelect.addEventListener('change', changeServiceSelect);

function removeData(event){
    event.preventDefault();
    const formData = new FormData(form);
    const id = formData.get('purchases_id');
    formSubmit.disable = true;
    formRemove.disable = true;
    axios.delete('/newcalendar', {
        data: {id}
    }).then((res) => console.log(res))
        .catch((e) => console.log('ErrorMessage: ', e))
        .finally(() => {
            modal.toggle();
            document.location.reload();
        });
}

function saveData(event) {
    event.preventDefault();
    formSubmit.disable = true;
    formRemove.disable = true;

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
        });
}

function timeToDateTime(time) {
    const date = new Date();
    const {hour, minute} = parseTime(time);
    date.setHours(hour, minute, 0);

    return date.toISOString().split('T')[0] + ' '
        + date.toTimeString().split(' ')[0];
}

function parseTime(time) {
    const hour = time.slice(0,2);
    const indexOfSeparator = time.indexOf(':');
    const minute = time.slice(indexOfSeparator+1, indexOfSeparator+3);
    return {
        'hour': hour,
        'minute': minute
    };
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

function plusTime(fT, sT){
    const {hour: fHour, minute: fMinute} = parseT(fT);
    const {hour: sHour, minute: sMinute} = parseT(sT);
    const hour = parseInt(fHour) + parseInt(sHour);
    const minute = parseInt(fMinute) + parseInt(sMinute);
    return `${pT(hour)}:${pT(minute)}:00`;
}

function parseT(stringTime) {
    const hour = stringTime.slice(0, 2);
    const minute = stringTime.slice(3, 5);
    return {
        hour, minute
    }
}



axios.get('/newcalendar/staffs')
    .then(initCalendar)
    .catch(errorResponse);

function mapStaffs(res) {
    return res.map( ({id, name}) => ({id, title: name}));
}

function initCalendar({data})
{
    const calendar = new Calendar(calendarEl, {
        plugins: [ resourceTimeGridPlugin, interactionPlugin ],
        initialView: 'resourceTimeGridDay',
        locale: 'ru',
        selectable: true,
        allDaySlot: false,
        resources: data.data,
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
        events: {
            url: '/newcalendar/purchases',
            success: ({data}) => data
        }
    });

    calendar.render();
}

function fillModal(props) {
    price.value = props['total_price'];
    serviceStartDate.value = `${pT(props.startTime.getHours())}:${pT(props.startTime.getMinutes())}:${pT(props.startTime.getSeconds())}`;
    endTimeInput.value = `${pT(props.endTime.getHours())}:${pT(props.endTime.getMinutes())}:${pT(props.endTime.getSeconds())}`;
    purchases_id.value = props['purchase_id'];
    inputStaff.value = props['staff'].title;
    select(clientSelect, props['client_id']);
    select(serviceSelect, props['service_id']);
    formRemove.hidden = false;
}

function errorResponse(err){
    console.log('Error message: ', err);
}

function parseDateToTime(predate){
    const date = new Date(predate);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${pT(hour)}:${pT(minute)}`;
}

function pT(time) {
    return time < 10 ? `0${time}` : time;
}


function clearModalForm() {
    select(serviceSelect, 'none');
    select(clientSelect, 'none');
    price.value = '';
    endTimeInput.value = '';
}

function select(select, value)
{
    const options = select.getElementsByTagName('option');

    for (let i = 0; i < options.length; i++) {
        if (options[i].value == value) select[i].selected = true;
    }
}


