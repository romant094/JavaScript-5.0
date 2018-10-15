let today = new Date(),
    main = document.querySelector('.main'),
    output = document.querySelector('.output'),
    dates = document.querySelectorAll('input'),
    day1 = dates[0].valueAsDate,
    day2 = dates[1].valueAsDate;


function formatDate(x) {
    let arr = [],
        str = '';

    arr[0] = x.getHours();
    arr[1] = x.getMinutes();
    arr[2] = x.getSeconds();
    arr[3] = x.getDate();
    arr[4] = x.getMonth() + 1;
    arr[5] = x.getFullYear();

    for (let i = 0; i < arr.length; i++) {
        if (String(arr[i]).length < 2) {
            arr[i] = '0' + arr[i];
        }
    }

    str = arr[0] + ':' + arr[1] + ':' + arr[2] + ' ' + arr[3] + '.' + arr[4] + '.' + arr[5];
    return str;
}

function showWeekDay(x) {
    let arr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        wDay = x.getDay();
    return arr[wDay];
}

function countDays(x, y) {
    console.log(x, y);
    return Math.abs((y - x) / (3600000 * 24));
}

output.innerHTML += `<br> Текущие время и дата: <b>${formatDate(today)}</b> <br>`;
output.innerHTML += `День недели: <b>${showWeekDay(today)}</b>`;

dates[2].value = countDays(day1, day2);

dates[0].addEventListener('change', () => {
    day1 = dates[0].valueAsDate;
    dates[2].value = countDays(day1, day2);
});

dates[1].addEventListener('change', () => {
    day2 = dates[1].valueAsDate;
    dates[2].value = countDays(day1, day2);
});