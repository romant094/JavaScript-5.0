window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let d = document,
        tab = d.querySelectorAll('.info-header-tab'),
        info = d.querySelector('.info-header'),
        tabContent = d.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++
            ) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer
    let deadline = '2018-12-20';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds,
            minutes,
            hours;

        if (t > 0) {
            seconds = Math.floor((t / 1000) % 60);
            minutes = Math.floor((t / 1000 / 60) % 60);
            hours = Math.floor(t / (1000 * 60 * 60));
        } else {
            seconds = 0;
            minutes = 0;
            hours = 0;
        }

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = d.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function formatTime(x) {
            if (x < 10) x = '0' + x;
            return x;
        }

        function updateClock() {
            let t = getTimeRemaining(endtime);

            hours.textContent = formatTime(t.hours);
            minutes.textContent = formatTime(t.minutes);
            seconds.textContent = formatTime(t.seconds);

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);
});