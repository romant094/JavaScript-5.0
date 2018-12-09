function calc() {
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

    persons.addEventListener('keypress', () => {
        testInput(/\d/);
    });

    restDays.addEventListener('keypress', () => {
        testInput(/\d/);
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
    function testInput(regExp) {
        if (!regExp.test(event.key)) {//если не цифра отменяем ввод
            event.preventDefault();
        }
    }
}

module.exports = calc;