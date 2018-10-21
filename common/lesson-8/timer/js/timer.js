let timerSettings = document.querySelectorAll('input'),
    hours = +timerSettings[0].value,
    minutes = +timerSettings[1].value,
    seconds = +timerSettings[2].value,
    timer = document.querySelector('.timer'),
    start = document.querySelector('#start');

window.addEventListener('DOMContentLoaded', () => {
    setTimer(hours, minutes, seconds);
});

function setTimer(a, b, c) {
    a = hours;
    b = minutes;
    c = seconds;

    if (a == '' && b == '' && c == '') {
        timer.textContent = 'Timer!';
    } else {
        timer.textContent = `${a}:${b}:${c}`;
    }
}

function startTimer() {
    if (seconds == 0) {
        if (minutes == 0) {
            if (hours == 0) {
                timer.textContent = "Time's up!";
                for (let i = 0; i < timerSettings.length; i++) {
                    timerSettings[i].removeAttribute('disabled');
                }
                return;
            }
            hours--;
            minutes = 60;
            if (hours < 10) hours = '0' + hours;
        }
        minutes--;
        if (minutes < 10) minutes = '0' + minutes;
        seconds = 60;
    } else {
        seconds--;
        if (seconds < 10) seconds = '0' + seconds;
        timer.textContent = `${hours}:${minutes}:${seconds}`;
        console.log(`${hours}:${minutes}:${seconds}`);
    }

    setTimeout(startTimer, 1000);
}

for (i = 0; i < timerSettings.length; i++) {
    timerSettings[i].addEventListener('input', () => {
        hours = +timerSettings[0].value;
        minutes = +timerSettings[1].value;
        seconds = +timerSettings[2].value;

        setTimer(hours, minutes, seconds);
    });
}

start.addEventListener('click', () => {
    console.log('Timer started!');
    hours = +timerSettings[0].value;
    minutes = +timerSettings[1].value;
    seconds = +timerSettings[2].value;
    for (let i = 0; i < timerSettings.length; i++) {
        timerSettings[i].setAttribute('disabled', '');
    }
    startTimer();
});