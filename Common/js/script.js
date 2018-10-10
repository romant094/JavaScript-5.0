'use strict';

let money, time;

function start() {
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    time = prompt("Введите дату в формате YYYY-MM-DD", "");
}

start();

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: true,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt("Во сколько обойдется?", "");
            if ((typeof (a) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50)) {
                console.log('done');
                appData.expenses[a] = b;
            } else {
                i--;
            }
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ваш бюджет на 1 день: " + appData.moneyPerDay);
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?'),
                percent = +prompt('Под какой процент?');

            appData.monthIncome = save / 100 / 12 * percent;
            alert('Доход с Вашего депозита в месяц: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function () {
        let optExpenses;
        for (let i = 0; i < 3; i++) {
            optExpenses = prompt('Статья необязательных расходов?');
            appData.optionalExpenses[i + 1] = optExpenses;
        }
    },
    chooseIncome: function () {
        let i = 0;
        while (i < 1) {
            let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
            if ((typeof (items) === 'string' && (typeof (a)) != null && items != '')) {
                appData.income = items.split(', ');
                appData.income.push(prompt('Может, что-то еще?', ''));
                appData.income.sort();
                i++;
            } else {
                i = 0;
            }
        }

        appData.income.forEach(function (elem, i) {
            document.write(`<p> ${i + 1}: ${elem} </p>`);
        });
    }
};

for (const key in appData) {
    console.log(`Наша программа включает в себя данные: ${key}`);
}