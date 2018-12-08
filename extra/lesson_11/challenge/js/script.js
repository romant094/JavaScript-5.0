let request = new XMLHttpRequest,
    cont = document.querySelector('.cars-grid');

request.open('GET', 'js/cars.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('readystatechange', () => {
    if (request.readyState == 4 && request.status == 200) {
        let allData = JSON.parse(request.response),
            countries = [],
            filters = document.querySelector('#filters');

        allData.cars.forEach((item) => {
            countries.push(item.category);
        });

        countries = unique(countries);

        for (let i = 0; i < countries.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', i + 1);
            option.textContent = countries[i];
            filters.appendChild(option);
        }
        
        filters.addEventListener('change', () => {
            let filteredData = {
                cars: []
            },
                index = filters.selectedIndex,
                selectedCountry = countries[index - 1];

            if (index > 0) {
                allData.cars.forEach((item) => {
                    if (item.category == selectedCountry) {
                        filteredData.cars.push(item);
                    }
                });
            } else {
                filteredData = allData;
            }

            createDOM(filteredData);
        });
	
	    createDOM(allData);
    }
});

function unique(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}

function cutString(string) {
    if (string.length > 50) {
        return string.substring(0, 99) + '...';
    }
}

function createDOM(data) {
	cont.innerHTML = '';
	data.cars.forEach((item) => {
		cont.innerHTML += `
                <div class="col-sm-6 col-md-4 car">
                    <div class="thumbnail">
                        <div class="img__container text-center">
                            <img class="img-fluid" src="${item.img}">
                        </div>
                        <div class="caption">
                            <div>
								<h4>${item.name}</h4>
							</div>
                            <p class="text-right"><strong>${item.category}</strong></p>
                            <p>${cutString(item.description)}</p>
                            <p class="text-right car-price">$${item.price}</p>
                            <p class="text-center"><a href="#" class="btn btn-primary col-6 col-xs-8 col-md-12 " role="button">Buy</a></p>
                        </div>
                    </div>
                </div>`;
	});
}