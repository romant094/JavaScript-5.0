'use strict';

let money = prompt("Ваш бюджет на месяц?", ""),
    time = prompt("Введите дату в формате YYYY-MM-DD", ""),
    expMandatoty = "",
    expMandatotyCount = "",
    appData = {
        budget: money,
        timeData: time,
        expenses: [],
        optionalExpenses: "",
        income: "",
        savings: false
    };

const month = 30;

for (let i = 0; i <= 1; i++) {
    expMandatoty = prompt("Введите обязательную статью расходов в этом месяце", "");
    expMandatotyCount = prompt("Во сколько обойдется?", "");
    appData.expenses[i] = expMandatoty + ': ' + expMandatotyCount;
}

alert("Ваш бюджет на 1 день: " + money / month);

console.log(appData);