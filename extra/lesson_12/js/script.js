
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', function () {
    function countUsd() {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('readystatechange', () => {
                let data = JSON.parse(request.response);

                if (request.readyState === 4 && request.status == 200) {                    
                    resolve(data);
                } else {
                    reject();
                }
            })
        });
    }

    countUsd()
        .then(() => {
            inputUsd.value = inputUsd.value / data.usd;
        })
        .catch(() => {
            inputUsd.value = "Что-то пошло не так!";
        });
});

