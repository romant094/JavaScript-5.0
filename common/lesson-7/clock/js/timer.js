window.addEventListener('DOMContentLoaded', () => {

    let clock = document.querySelector('.timer');

    function formatTime(x) {
        if (x < 10) x = '0' + x;
        return x;
    }

    let id = setInterval(function timeShow() {
        let date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
});
