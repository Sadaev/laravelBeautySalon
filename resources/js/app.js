require('./bootstrap');
const {createDebugLogger} = require("resolve-url-loader/lib/join-function/debug");

const cells = document.querySelectorAll('.cell');
const modal = new bootstrap.Modal(document.querySelector('#calendarModal'), {
    keyboard: false
});


const form = document.querySelector('#purchase_form');
const formSubmit = form.querySelector('#form_submit');

cells.forEach(cell => {
    cell.addEventListener('click', (event) => fillModalForm(event))
})

// formSubmit.addEventListener('submit', () => {
//     axios.post('/calendar/update', new FormData(form))
//         .then((response ) => console.log(response))
//         .catch((error) => console.log(error))
//         .finally(() => console.log('finish'));
// })

const fillModalForm = (e) => {
    const $el = e.target;
    const staff_id = form.querySelector('[name="staff_id"]');
    const staff_name = form.querySelector('[name="staff_name"]');
    const register_date = form.querySelector('#time');
    const services = form.querySelector('#services');

    staff_id.value = $el.dataset.staffid || '';
    staff_name.value = $el.dataset.staffname || '';
    register_date.value = $el.dataset.time || '';

    modal.toggle();
};

