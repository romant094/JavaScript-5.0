'use strict';

let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    i = 0,
    dayToday = new Date().getDay(),
    allDays = document.getElementsByTagName('p');

while (i < weekDays.length) {
    document.write('<p class="day' + i + '">' + weekDays[i] + '</p>');

    if (i == 0 || i == 6) {
        allDays[i].classList.add('weekend');
    } else if (i == dayToday) {
        allDays[i].classList.add('today');
    }
    i++;
}

let arr = ['16253671273', '215371253', '37172364', '41873653', '51783835', '61823123', '76137537'];

for (i = 0; i < arr.length; i++) {
    if (arr[i].substring(0, 1) == 3 || arr[i].substring(0, 1) == 7) {
        console.log(arr[i]);
    }
}