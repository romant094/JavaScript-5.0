let menu = document.querySelector('.menu'),
    menuItems = menu.querySelectorAll('li'),
    li = document.createElement('li'),
    title = document.querySelector('#title'),
    column = document.querySelectorAll('.column'),
    adv = document.querySelector('.adv'),
    promptBlock = document.querySelector('#prompt');

menu.appendChild(li);
li.classList.add('menu-item');
li.textContent = 'Пятый пункт';

document.body.style.background = 'url(img/apple_true.jpg) center no-repeat';

title.textContent = 'Мы продаем только подлинную технику Apple';

column[1].removeChild(adv);

let promptText = prompt('Каково Ваше отношение к технике Apple?', '');

promptBlock.textContent = promptText;