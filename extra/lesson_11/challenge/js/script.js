let request = new XMLHttpRequest,
	cont = document.querySelector('.container');

request.open('GET', 'js/cars.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('readystatechange', () => {
    if (request.readyState == 4 && request.status == 200) {
        let data = JSON.parse(request.response);
	    data.cars.forEach((item) => {
		    cont.innerHTML += `<p>${item.category}</p><p>${item.description}<p><p><img src="${item.img}"><p><p>${item.name}<p><p>${item.price}<p><hr>`;
	    });
    }
});
