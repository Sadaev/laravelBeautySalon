export function timeToDateTime(time) {
    const date = new Date();
    const {hour, minute} = parseTime(time);
    date.setHours(hour, minute, 0);

    return date.toISOString().split('T')[0] + ' '
        + date.toTimeString().split(' ')[0];
}

export function parseTime(time) {
    const hour = time.slice(0,2);
    const indexOfSeparator = time.indexOf(':');
    const minute = time.slice(indexOfSeparator+1, indexOfSeparator+3);
    return {
        'hour': hour,
        'minute': minute
    };
}
export function plusTime(fT, sT){
    const {hour: fHour, minute: fMinute} = parseT(fT);
    const {hour: sHour, minute: sMinute} = parseT(sT);
    const hour = parseInt(fHour) + parseInt(sHour);
    const minute = parseInt(fMinute) + parseInt(sMinute);
    return `${pT(hour)}:${pT(minute)}:00`;
}

 export function parseT(stringTime) {
    const hour = stringTime.slice(0, 2);
    const minute = stringTime.slice(3, 5);
    return {
        hour, minute
    }
}

export function parseDateToTime(predate){
    const date = new Date(predate);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${pT(hour)}:${pT(minute)}`;
}

export function select(select, value)
{
    const options = select.getElementsByTagName('option');

    for (let i = 0; i < options.length; i++) {
        if (options[i].value == value) select[i].selected = true;
    }
}

export function pT(time) {
    return time < 10 ? `0${time}` : time;
}
