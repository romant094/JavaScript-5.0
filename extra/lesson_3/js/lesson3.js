'use strict';

let str = 'урок-3-был слишком легким',
    strNew,
    i;

str = str.substring(0, 1).toUpperCase() + str.substring(1);

for (i = 0; i < str.length - 1; i++) {
    str = str.replace('-', ' ');
}

strNew = str.substring(str.lastIndexOf(' ') + 1);

function cutChars(str, count, char) {
    let xStr = str.substring(0, str.length - count),
        newChar = '';

    for (i = 0; i < count; i++) {
        newChar += char;
        console.log(newChar);
    }

    return xStr + newChar;
}

strNew = cutChars(strNew, 2, 'о');

document.write('<p>' + strNew + '</p>');

let arr = [20, 33, 1, 'Человек', 2, 3],
    arrSum = 0;

for (i = 0; i < arr.length; i++) {
    if (typeof (arr[i]) === 'string') {
        arr.splice(i, 1);
    }

    arr[i] = arr[i] ** 3;
    arrSum += arr[i];
}

console.log(Math.sqrt(arrSum));

function oneArg(x) {
    if (typeof (x) === 'string') {
        x = x.trim();
    } else {
        alert('То, что Вы ввели, не является строкой!');
    }

    if (x.length > 50) {
        x = x.substring(0, 49) + '...';
    }

    return x;
}

let a = oneArg('          akshdgasdgasdfjdaghdjfahfgsdkfsdhfsdkfhgsdfkdfgahsdkfhasdgfkadsgfadsfkgdsfgakfgsdhfaskfashdgfkasfsh             ');

console.log(a);