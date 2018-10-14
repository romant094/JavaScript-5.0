let obj = {
    simple: []
};

for (let i = 1; i <= 100; i++) {
    let arr = [];
    for (let j = 1; j <= i; j++) {
        if (i % j === 0) {
            arr.push(j);
        }
        obj.simple[i] = arr;
    }
}

obj.simple.forEach(function(elem, i) {
    if (elem.length < 3) document.write(`<p>Простое число ${i}, делители ${elem}</p>`);
});