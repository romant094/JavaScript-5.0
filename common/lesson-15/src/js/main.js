window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadLine = '2018-10-21';

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
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
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

    //Tel valid
    let inputTel = document.querySelectorAll('input[type="tel"]'),
    x = '_', //Заменяемый символ
    mask = `+7 (${x}${x}${x}) ${x}${x}${x} ${x}${x} ${x}${x}`; //Маска поля;

    inputTel.forEach(function(event) { // Проверка ввода
        event.addEventListener('keypress', (event) => {
            let target = event.target;
            if (target.value.length < 1 || target.selectionStart == 0) {
                testInput(/\+/);
            } else if (target.value.length > 0) {
                testInput(/\d/);
            }
        });

        event.addEventListener('focus', (event) => {
            let target = event.target;
            if (!target.value) {
                target.value = mask;//Записываем маску в значение
            }
            target.selectionStart = mask.indexOf(x);//Устанавливаем курсор к первому заменяемогу символу
            target.setAttribute('maxlength', mask.length);//Максимальное количество символов не больше количества символов маски
        });

        event.addEventListener('blur', (event) => { //Если поле заполнено не по маске или не до конца - обнуляем
            let target = event.target;
            if (target.value.match(x) || target.value.length < mask.length) {
                target.value = '';
            }
        });

        event.addEventListener('input', (event) => {
            let target = event.target,
                temp; //временная переменная значения поля ввода
                temp = target.value.substring(0, target.selectionStart) + //В переменную поместили значение поля ввода до курсора
                    mask.substring(target.selectionStart); //и добавили остаток с маски
                target.value = temp;
                target.selectionStart = temp.indexOf(x); //Устанавливаем курсор к первому заменяемогу символу
        });

    });

    // Modal
    
    let more = document.querySelector('.more'),
        tabsInfo = document.querySelector('.info'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    function modalOn() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    more.addEventListener('click', modalOn);

    tabsInfo.addEventListener('click', (event) => {
        let target = event.target;
            if (target && target.classList.contains('description-btn')) {
                for (let i = 0; i < descriptionBtn.length; i++) {
                    if (target == descriptionBtn[i]) {
                        modalOn.call(descriptionBtn[i]);
                        break;
                    }
                }
            }
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contactForm = document.querySelector('.contact-form form'), //добавляем форму контактов
        contactFormInput = contactForm.getElementsByTagName('input'); //добавляем inputs формы контактов

        statusMessage.classList.add('status');
        contactFormInput[0].setAttribute('name', 'email'); //добавим атрибут name
        contactFormInput[1].setAttribute('name', 'phone'); //добавим атрибут name 

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        ajaxSend(form, input);
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        ajaxSend(contactForm, contactFormInput);
    });

    function ajaxSend(item, input) {
        let ajaxSendForm = item,
            ajaxSendFormInput = input;

        ajaxSendForm.appendChild(statusMessage);

        let formData = new FormData(ajaxSendForm);

        function postData() {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);

                request.send(json);

                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }

        function clearInput() {
            for (let i = 0; i < ajaxSendFormInput.length; i++) {
                ajaxSendFormInput[i].value = '';
            }
        }

        postData()
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);

    }

    //slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex +=n);
    }

    function currentSlide(n) {
        showSlides(slideIndex =n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //Calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        testCalcData();
    });

    restDays.addEventListener('change', function() {
        testCalcData();
    });

    place.addEventListener('change', function() {
        testCalcData();
    });

    persons.addEventListener('keydown', (event) => {
        isValid(event);
    });

    restDays.addEventListener('keydown', (event) => {
        isValid(event);
    });

    function testCalcData() {
        personsSum = +persons.value;
        daysSum = +restDays.value;
        if (restDays.value) {
            restDays.value = daysSum; //Убираем первый(е) 0
        }
        if (persons.value) {
            persons.value = personsSum; //Убираем первый(е) 0
        }

        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' ||
            persons.value == '' ||
            daysSum == '' ||
            personsSum == '') {
                totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.options[place.selectedIndex].value;
        }
    }

    // Проверка на ввод
    function isValid(e) {
        let key = e.keyCode;

    if (key == 46 || key == 8 || key == 9 || (key >= 35 && key <= 40)) {
      return;
    } else {
      if ((key < 48 || key > 57) && (key < 96 || key > 105)) {
        e.preventDefault();
      }
    }
    }
});