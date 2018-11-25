function getFriendlyNumbers(start, end) {
	let res = [];

	if (validation(start, end)) {
		let arr = createArray(start, end);

		for (let i = 0; i < arr.length; i++) {
			let tempVal = findOne(arr[i]);

			if (tempVal.length != 0) {
				res.push(tempVal)
			}
		}
	} else {
		res = false;
	}
<<<<<<< HEAD

	return res;
}
=======

	return res;
}

console.log(getFriendlyNumbers(1, 1));
console.log(getFriendlyNumbers(1, 300));
console.log(getFriendlyNumbers(1, 1210));
console.log(getFriendlyNumbers(284, 500));
console.log(getFriendlyNumbers(-1, 300));
console.log(getFriendlyNumbers(300, 1));
console.log(getFriendlyNumbers('1', '300'));

>>>>>>> 6c4e588fe8104754d05695af2283255b1f7fde37

function createArray(a, b) {
	let arr = [];

	for (let i = a; i <= b; i++) {
		arr.push(i);
	}
	return arr;
}

function findOne(a) {
	let sum = 0,
		tempVal = 0,
		tempArr = [];

	for (let i = 0; i < a; i++) {
		if (a % i == 0) {
			sum += i;
		}
	}
	for (let j = 0; j < sum; j++) {
		if (sum % j == 0) {
			tempVal += j;
		}
	}
	if (a != sum && a < sum) {
		if (a == tempVal) {
			tempArr.push(a);
			tempArr.push(sum);
		}
	}

	return tempArr;
}

function validation(a, b) {
	let isValid = true;

	if (typeof(a) !== 'number' || typeof(b) !== 'number' || (a == '') || (b == '') || a > b || a < 1 || b < 1) {
		isValid = false;
	}
	return isValid;
}

module.exports = {
	firstName: 'Anton',
	secondName: 'Romankov',
	task: getFriendlyNumbers
}