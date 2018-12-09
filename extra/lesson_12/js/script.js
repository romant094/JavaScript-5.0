'use strict';

let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

// inputRub.addEventListener('input', () => {
//     let request = new XMLHttpRequest();

//     request.open('GET', 'js/current.json');
//     request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     request.send();

//     request.addEventListener('readystatechange', function () {
//         if (request.readyState === 4 && request.status == 200) {
//             let data = JSON.parse(request.response);

//             inputUsd.value = inputRub.value / data.usd;
//         } else {
//             inputUsd.value = "Что-то пошло не так!";
//         }
//     });
// });

inputRub.addEventListener('input', () => {
    function countUsd() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300) {
                        let rates = JSON.parse(request.response);
                        resolve(rates);
                    }
                } else {
                    let error = "Что-то пошло не так!";
                    reject(error);
                }
            });
        });
    }

    // console.log(countUsd());
    countUsd()
        .then(() => {
            console.log(rates);
            inputUsd.value = inputRub.value / rates.usd;
        })
        .catch((error) => {
            inputUsd.value = error;
        });
});