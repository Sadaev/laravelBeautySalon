require('./bootstrap');

const cells = document.querySelectorAll('.cell');
const modal = new bootstrap.Modal(document.querySelector('#calendarModal'), {
    keyboard: false
});
const form = document.querySelector('#purchase_form');
const formSubmit = document.querySelector('#form_submit');
const serviceSelect = form.querySelector('#services');
const formRemove = document.querySelector('#purchase_remove');

serviceSelect.addEventListener('change', getServicePrice);

cells.forEach(cell => {
    cell.addEventListener('click', fillModalForm)
})

formSubmit.addEventListener('click', saveData)

formRemove.addEventListener('click', removeData);

function removeData(event){
    event.preventDefault();
    const formData = new FormData(form);
    const id = formData.get('purchases_id');
    axios.delete('/calendar', {
        data: {id}
    }).then((res) => console.log(res))
        .catch((e) => console.log('ErrorMessage: ', e))
        .finally(() => {
            modal.toggle();
            document.location.reload();
        });
}

function getServicePrice(event) {
    const $elem = event.currentTarget;
    const $selectedOption = $elem.selectedOptions.item(0);
    const priceInput = form.querySelector('#price');
    const price = $selectedOption.dataset.price;
    priceInput.value = price ?? '';
}

function saveData(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const time = parseTime(formData.get('register_date'));
    const date = new Date();
    date.setHours(time.hour, time.minute, 0);
    const prepareDate = date.toISOString().split('T')[0] + ' '
        + date.toTimeString().split(' ')[0];
    formData.set('register_date', prepareDate);
    axios.post('/calendar', formData)
        .then((response ) => {
            console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            modal.toggle();
            document.location.reload();
        });
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
    const $el = e.currentTarget;
    console.log('element: ', $el);
    const staff_id = form.querySelector('[name="staff_id"]');
    const staff_name = form.querySelector('#staff_name');
    const register_date = form.querySelector('#time');
    const services = form.querySelector('#services');
    const purchases_id = form.querySelector('#purchases');
    const servicesSelect = form.querySelector('#services');
    const clientSelect = form.querySelector('#clients');
    const price = form.querySelector('#price');

    const purchaseInfo = $el.querySelector('.registerInfo');
    let staffIdValue = $el.dataset.staffid;
    let staffNameValue = $el.dataset.staffname;
    let timeValue = $el.dataset.time;
    let priceValue = '';
    let service = '';
    let client = '';
    let serviceId = '';
    let clientId = '';
    let purchaseValue = '';

    console.log({
        'staffid': staffIdValue,
        'stafName': staffNameValue,
        'time': timeValue
    })

    select(servicesSelect, 'none');
    select(clientSelect, 'none');

    if(purchaseInfo){
        purchaseValue = purchaseInfo.dataset.purchaseid;
        priceValue = purchaseInfo.querySelector('[data-service="price"]').dataset.price;
        serviceId = purchaseInfo.querySelector('[data-service="name"]').dataset.serviceid;
        clientId = purchaseInfo.querySelector('[data-client="name"]').dataset.clientid;
        select(servicesSelect, serviceId);
        select(clientSelect, clientId)
        formRemove.hidden = false
    }else{
        formRemove.hidden = true;
    }

    purchases_id.value = purchaseValue;
    staff_id.value = staffIdValue || '';
    staff_name.value = staffNameValue || '';
    register_date.value = timeValue || '';
    price.value = priceValue || '';
    modal.toggle();
}

function select(select, value)
{
    const options = select.getElementsByTagName('option');

    for (let i = 0; i < options.length; i++) {
        if (options[i].value == value) select[i].selected = true;
    }
}

