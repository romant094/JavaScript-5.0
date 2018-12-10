function timer() {

    let deadLine = '2018-12-15';

    // Добавляем 0 если число однозначное
    let zeroPlus = (item) => {
        if (item < 10) {
            item = '0' + item;
        }
        return item;
    };

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(deadLine) -
            Date.parse(new Date()) +
            ((new Date().getTimezoneOffset()) * 60 * 1000),
            seconds, minutes, hours;

        if (t <= 0) {
            seconds = minutes = hours = 0;
        } else {
            seconds = Math.floor((t / 1000) % 60);
            minutes = Math.floor((t / 1000 / 60) % 60);
            hours = Math.floor(t / (1000 * 60 * 60));
        }
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = zeroPlus(t.hours);
            minutes.textContent = zeroPlus(t.minutes);
            seconds.textContent = zeroPlus(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock('timer', deadLine);
}

module.exports = timer;