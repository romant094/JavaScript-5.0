let d = document,
    startBtn = d.getElementById('start'),
    budgetValue = d.getElementsByClassName('budget-value')[0],
    dayBudgetValue = d.getElementsByClassName('daybudget-value')[0],
    levelValue = d.getElementsByClassName('level-value')[0],
    expensesValue = d.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = d.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = d.getElementsByClassName('income-value')[0],
    monthSavingsValue = d.getElementsByClassName('monthsavings-value')[0],

    expensesItem = d.querySelectorAll('.expenses-item'),
    expensesBtn = d.getElementsByTagName('button')[0],
    optionalExpensesBtn = d.getElementsByTagName('button')[1],
    countBtn = d.getElementsByTagName('button')[2],
    optionalExpensesItem = d.querySelectorAll('.optionalexpenses-item'),
    incomeItem = d.querySelector('.choose-income'),
    yearSavingsValue = d.getElementsByClassName('yearsavings-value')[0],
    checkSavings = d.querySelector('#savings'),
    sumValue = d.querySelector('.choose-sum'),
    percentValue = d.querySelector('.choose-percent'),
    yearValue = d.querySelector('.year-value'),
    monthValue = d.querySelector('.month-value'),
    dayValue = d.querySelector('.day-value'),
    buttons = d.querySelectorAll('button');

let money,
    time;

for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].setAttribute('disabled', '');
}

// Обязательные расходы
for (let i = 0; i < expensesItem.length; i++) {
    expensesItem[i].addEventListener('input', () => {
        if (expensesItem[i].value !== '') {
            expensesBtn.removeAttribute('disabled');
        }
    });

    expensesItem[i].addEventListener('input', () => {
        if (expensesItem[i].value == '') {
            expensesBtn.setAttribute('disabled', '');
        }
    });
}

// Необязательные расходы
for (let i = 0; i < optionalExpensesItem.length; i++) {
    optionalExpensesItem[i].addEventListener('input', () => {
        if (optionalExpensesItem[i].value !== '') {
            optionalExpensesBtn.removeAttribute('disabled');
        }
    });

    optionalExpensesItem[i].addEventListener('input', () => {
        if (optionalExpensesItem[i].value == '') {
            optionalExpensesBtn.setAttribute('disabled', '');
        }
    });
}

startBtn.addEventListener('click', () => {
    //time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет?", "");
    }

    appData.budget = money; appData.timeData = time;
    budgetValue.textContent = money.toFixed(0);
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    countBtn.removeAttribute('disabled');
});

expensesBtn.addEventListener('click', () => {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof (a) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50)) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }

    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', () => {
    let expenses = 0;

    expensesValue.textContent == '' ? expenses = 0 : expenses = +expensesValue.textContent;

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((+appData.budget - expenses) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay >= 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        levelValue.textContent = 'Произошла ошибка';
    }
});

incomeItem.addEventListener('input', () => {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', () => {
    appData.savings == true ? appData.savings = false : appData.savings = true;
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false
};

// Если программа еще не запущена( не нажали кнопку "Начать расчет") или нужное (соответственное) для заполнения поле пустое - сделать кнопки неактивными. (Например, если ни одно поле обязательных расходов не заполнено - блокируем кнопку "Утвердить")

// Реализовать функционал: при расчете дневного бюджета учитывать сумму обязательных трат (т. e. от бюджета на месяц отнимаем общую сумму всех обяз. трат и ее делим на 30 дней)