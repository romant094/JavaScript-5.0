'use strict';

let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    i = 0,
    dayToday = new Date().getDay(),
    allDays = document.getElementsByTagName('p');

while (i < weekDays.length) {
    document.write('<p>' + weekDays[i] + '</p>');
    i++;
}

for (i = 0; i < allDays.length - 1; i++) {
    allDays[0].classList.add('weekend');
    allDays[6].classList.add('weekend');
    allDays[dayToday].classList.add('today');
}

let arr = ['16253671273', '215371253', '37172364', '41873653', '51783835', '61823123', '76137537'];

for (i = 0; i < arr.length; i++) {
    if (arr[i].substring(0, 1) == 3 || arr[i].substring(0, 1) == 7) {
        console.log(arr[i]);
    }
}