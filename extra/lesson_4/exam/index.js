let startInput = document.querySelector('#start'),
	endInput = document.querySelector('#end'),
	findFriendly = document.querySelector('#find-friendly');

function getFriendlyNumbers(start, end) {
	start = parseInt(startInput.value);
	end = parseInt(endInput.value);
	
	if (validation(start, end)) {
		let arr = createArray(start, end),
			res = [];
		
		for (let i = 0; i < arr.length; i++) {
			let tempVal = findOne(arr[i]);
			
			if (tempVal.length != 0) {
				res.push(tempVal)
			}
		}
		
		console.log(res);
		res = checkResult(res);
		console.log(res);
		
		return res;
	} else {
		return false;
	}
	
}

findFriendly.addEventListener('click', () => {
	checkResult(getFriendlyNumbers(start, end));
});

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
	if (a != sum) {
		if (a == tempVal) {
			tempArr.push(a);
			tempArr.push(sum);
		}
	}
	tempArr.sort();
	return tempArr;
}

function validation(a, b) {
	let isValid = true;
	
	a = startInput.value;
	b = endInput.value;
	
	if (isNaN(a) || isNaN(b) || (a == '') || (b == '') || a > b || a < 1 || b < 1) {
		isValid = false;
	}
	return isValid;
}

function checkResult(arr) {
	let result = [];
	
	nextInput:
		for (let i = 0; i < arr.length; i++) {
			let str = arr[i]; // для каждого элемента
			for (let j = 0; j < result.length; j++) { // ищем, был ли он уже?
				if (result[j] == str) continue nextInput; // если да, то следующий
			}
			result.push(str);
		}
	
	return result;
}