window.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    // Tabs
  
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
  
    const hideTabContent = (a) => {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    };
  
    hideTabContent(1);
  
    const showTabContent = (b) => {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    };
  
    info.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target.classList.contains('info-header-tab')){
        for (let i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
      }
    });
  
    // Timer
  
    let deadline = '2018-10-23';
  
    const getTimeRemaining = (endtime) => {
      let t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor(t/(1000*60*60));
      
      if (seconds < 10) {
        seconds = "0" + seconds;
      } 
      if (minutes < 10) {
        minutes  = "0" + minutes;
      } 
      if (hours < 10) {
        hours  = "0" + hours;
      } 
  
      return {
        'total' : t,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
      };
    };
  
    const setClock = (id, endtime) => {
      let timer = document.getElementById(id),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds');
  
  
      const updateClock = () => {
        let a = getTimeRemaining(endtime);
        hours.textContent = a.hours;
        minutes.textContent = a.minutes;
        seconds.textContent = a.seconds;
  
        if (a.total <= 0) {
          clearInterval(timeInterval);
          hours.textContent = "00";
          minutes.textContent = "00";
          seconds.textContent = "00";
        }
      };
      let timeInterval = setInterval(updateClock, 1000);
    };
  
    setClock('timer', deadline);
  
    // Modal
  
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
  
    more.addEventListener('click', function(){
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  
    close.addEventListener('click', function(){
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
    });
  
    // Modal on click buttons in tabs
  
    let infoWrapper = document.querySelector('.info'),
        descriptionBtn = document.querySelectorAll('.description-btn');
  
    infoWrapper.addEventListener('click', function(event){
      let target = event.target;
      if (target && target.classList.contains('description-btn')) {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
      }
    });
  
    //Forms
  
    let message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так..."
    };
  
    let form = document.getElementsByClassName('main-form')[0],
        formBottom = document.getElementById('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        inputPhone = document.getElementsByName('phone');
        statusMessage.classList.add('status');
  
    function sendForm(elem){
      elem.addEventListener('submit', function(e){
        e.preventDefault();
          elem.appendChild(statusMessage);
          let formData = new FormData(form);
  
          function postData(data) {
            return new Promise(function(resolve, reject){
              let request = new XMLHttpRequest();
  
              request.open('POST', 'server.php');
  
              request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
              request.onreadystatechange = function() {
                if (request < 4) {
                  resolve();
                } else if (request.readyState === 4){
                  if (request.status == 200 && request.status < 300) {
                    resolve();
                  }
                  else {
                    reject();
                  }
                }
              };
              request.send(data);
            });  
          }
          function clearInput() {
            for (let i = 0; i < input.length; i++) {
              input[i].value = '';
            }
          }
          postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => {
              statusMessage.innerHTML = message.success;
            })
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
        }); 
    }
  
    for (let i = 0; i < inputPhone.length; i++) {
      inputPhone[i].addEventListener('input', () => {
        inputPhone[i].value = inputPhone[i].value.replace(/[^\+?\d]/g, '');
      });
    } 
  
    sendForm(form);
    sendForm(formBottom);
  });