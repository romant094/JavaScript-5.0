let showOverlay = document.querySelectorAll('.description-btn');

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
    let deadline = '2018-10-20';

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

    // modal

    let more = d.querySelector('.more'),
        overlay = d.querySelector('.overlay'),
        close = d.querySelector('.popup-close');

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        d.body.style.overflow = '';
    });

    d.addEventListener('click', (event) => {
        let t = event.target;

        for (let i = 0; i < showOverlay.length; i++) {
            if (t == showOverlay[i] || t == more) {
                overlay.style.display = 'block';
                overlay.classList.add('more-splash');
                d.body.style.overflow = 'hidden';
            }
        }
    });

    // Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо',
        failure: 'Что-то пошло не так...'
    },
        form = d.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = d.createElement('div'),
        feedackForm = d.querySelector('#form');

    statusMessage.classList.add('status');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form),
            obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });
        let json = JSON.stringify(obj),
            phoneInput = d.querySelector('#phone');


        if (validation(phoneInput.value)) {
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            // for (let i = 0; input.length; i++) {
            //     input[0].value = '';
            // }
        } else {
            alert('Валидация не пройдена!');
        }

        function validation(string) {
            let isValid = true;

            if ((string.search(/\w/) != -1) || (string.search(/\+/) != -1) || (string.search(/\+/) != 0)) {
                isValid = false;
            }

            return isValid;
        }
    });
});