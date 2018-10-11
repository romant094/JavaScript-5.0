function getFriendlyNumbers(start, end) {

    // if ((typeof (parseFloat(start)) === 'string') || (typeof (parseFloat(end)) === 'string') || (typeof (start) == null) || (typeof (end) == null) || (start = '') || (end = '') || (end > start) || (start < 0) || (end < 0)) {
    //     return false;
    // } else {
    let arr = [];

    for (let i = start; i <= end; i++) {
        arr.push(i);
    }

    return arr;
}
// }

console.log(getFriendlyNumbers(200, 300));

function findFriendly(num) {
    let obj = {
        arr1: [],
        sum1: 0,
        arr2: [],
        sum2: 0
    };

    if (num > 3) {
        for (let i = 0; i < num; i++) {
            if (num % i === 0) {
                obj.arr1.push(i);
                obj.sum1 += i;
            }
        }

        console.log(`arr1: ${obj.arr1}`);
        console.log(`sum1: ${obj.sum1}`);

        for (let i = 0; i < obj.sum1; i++) {
            if (obj.sum1 % i === 0) {
                obj.arr2.push(i);
                obj.sum2 += i;
            }
        }
        console.log(`arr2: ${obj.arr2}`);
        console.log(`sum2: ${obj.sum2}`);

        (obj.sum2 === num) ? console.log(`Для числа ${num} есть дружественное число: ${obj.sum1}`) : console.log(`Дружественного числа не найдено`);
    } else {
        alert(`Введите число больше 3! `);
    }
}

// module.exports = {
//     firstName: 'Anton',
//     secondName: 'Romankov',
//     task: getFriendlyNumbers
// }

function smthHARD(number) {
    let x = 0;
    for (let i = 0; i < number; i++) {
        if (number % i === 0) {
            x += i;
        }
    }
    return x;
}

console.log(smthHARD(220));