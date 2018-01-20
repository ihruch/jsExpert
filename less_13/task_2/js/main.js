var btn = document.getElementById("play");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var result = document.getElementById("result");
result.style.fontWeight = 'bold';

var number, // рандомное чило
    idFirst, // число которое выпало у первого игрока
    idSecond, // число которое выпало у второго игрока
    isWinPlaers; // число кто стал победителем

// выводит случайное число
var getPlayerResult = () => number =  Math.floor((Math.random() * 3) + 1);

//принимать это число и возвращать слово «камень», «ножницы», или «бумага»
function getNameById(number) {
    switch (number) {
        case 1:
            return 'камень';
            break;
        case 2:
            return 'ножницы';
            break;
        case 3:
            return 'бумага';
            break;
    };
}

function determineWinner(numFirst, numSecond) {
    return isWinPlaers = (numFirst < numSecond) ? numFirst : !(numFirst == numSecond)? numSecond : null;
}

// Функция printResult должна принять номер игрока и вывести словами кто выиграл
function printResult(number) {
    result.innerHTML = (number == null)? "НИЧЬЯ!!!" : (number == idFirst)? "Выиграл игрок под номером 'ОДИН' " :  "Выиграл игрок под номерок 'ДВА' ";
}

// зупуск игры
function runGame() {
    idFirst = getPlayerResult();
    idSecond = getPlayerResult();
    player1.innerHTML = getNameById(idFirst);
    player2.innerHTML = getNameById(idSecond);

    determineWinner(idFirst, idSecond);
    printResult(isWinPlaers)
}

btn.addEventListener("click", runGame);


