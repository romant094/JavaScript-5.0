'use strict';

let num = '33721',
    multiply = 1,
    degree = 3,
    finalResult;

for (let i = 0; i < 5; i++) {
    multiply *= num.substring(i, i + 1);
    console.log(i + ": " + multiply);
}

finalResult = multiply ** degree;

console.log(finalResult);