function modal() {
    
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

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
        form.removeChild(statusMessage);
    });
    
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

}

export default modal;