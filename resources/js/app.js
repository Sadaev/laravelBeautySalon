require('./bootstrap');

const cells = document.querySelectorAll('.cell');
const modal = new bootstrap.Modal(document.querySelector('#calendarModal'), {
    keyboard: false
});
const form = document.querySelector('#purchase_form');
const formSubmit = document.querySelector('#form_submit');
const serviceSelect = form.querySelector('#services');


serviceSelect.addEventListener('change', getServicePrice);

cells.forEach(cell => {
    cell.addEventListener('click', fillModalForm)
})

formSubmit.addEventListener('click', saveData)

function getServicePrice(event) {
    const $elem = event.target;
    const $selectedOption = $elem.selectedOptions.item(0);
    const priceInput = form.querySelector('#price');
    const price = $selectedOption.dataset.price;
    priceInput.value = price ?? '';
}

function saveData(event) {
    event.preventDefault();
    console.log('Send axios');
    const formData = new FormData(form);
    const time = parseTime(formData.get('register_date'));
    const date = new Date();
    date.setHours(time.hour, time.minute, 0);
    const prepareDate = date.toISOString().split('T')[0] + ' '
        + date.toTimeString().split(' ')[0];
    formData.set('register_date', prepareDate);
    axios.post('/calendar/update', formData)
        .then((response ) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => console.log('finish'));
}

function parseTime(time) {
    const hour = time.slice(0,2);
    const indexOfSeparator = time.indexOf(':');
    console.log(indexOfSeparator);
    const minute = time.slice(indexOfSeparator+1, indexOfSeparator+3);
    return {
        'hour': hour,
        'minute': minute
    };
}

function fillModalForm(e)
{
    const $el = e.target;
    const staff_id = form.querySelector('[name="staff_id"]');
    const staff_name = form.querySelector('#staff_name');
    const register_date = form.querySelector('#time');
    const services = form.querySelector('#services');

    staff_id.value = $el.dataset.staffid || '';
    staff_name.value = $el.dataset.staffname || '';
    register_date.value = $el.dataset.time || '';

    modal.toggle();
};

