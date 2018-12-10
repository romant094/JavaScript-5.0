function valid() {

    let inputTel = document.querySelectorAll('input[type="tel"]'),
    x = '_', //Заменяемый символ
    mask = `+7 (${x}${x}${x}) ${x}${x}${x} ${x}${x} ${x}${x}`; //Маска поля;

    inputTel.forEach(function(event) { // Проверка ввода
        event.addEventListener('keydown', (event) => {
            let target = event.target;
            if (target.value.length < 1 || target.selectionStart == 0) {
                isValid(event);
            } else if (target.value.length > 0) {
                isValid(event);
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

}

export default valid;