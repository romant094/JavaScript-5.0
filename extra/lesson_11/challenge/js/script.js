let request = new XMLHttpRequest;

request.open('GET', 'js/cars.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('readystatechange', () => {
    if (request.readyState == 4 && request.status == 200) {
        data = JSON.parse(request.response);
    } else {
        document.write('Нет данных для отображения...');
    }
});

console.log(data);