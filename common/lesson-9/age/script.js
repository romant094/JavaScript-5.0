let age = document.getElementById('age');

function showUser(surname, name) {
    alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

let showUserCorrect = showUser.bind(age);

showUserCorrect('Ivan', 'Ivanov');