
var elem = document.getElementById("result");
var first,
    second,
    total = 0,
    setResults = '';

let getRndNumber = ()=> Math.floor((Math.random() * 6) + 1);

// генерация итоговой сторки
let setResult = (text) => setResults += text;

//проверка на дубль
function isNumbersEqual(first, second) {
   if (first == second ){
       setResult('Выпал дубль! ' + '<br>');
   }
}
// проверка на большую разницу
function isBigDifference() {
    if ((first < 3 && second >4 ) || (second < 3 && first >4)){
        setResult("Большой разброс между костями. Разница составлет " + Math.abs(second - first)+ "<br>");
    }
}

// подсчет общей суммы костей которыя выпала
let totalSum = () => total += first + second;
// основнная ф-ция запуска
function run() {
    for (let i = 0; i < 15; i++) {
        if ((i == 8) || (i == 13)) continue;

        first = getRndNumber();
        second = getRndNumber();
        setResult("Первая кость: " + first + " -- " + "Вторая кость: " + second + '<br>');
        isNumbersEqual(first, second);
        isBigDifference();
        setResult('------------------------------------------' + '<br>');
        totalSum();
    }
   elem.innerHTML = setResult();
}

run();

document.getElementById("summ").innerHTML = (total > 100)? `Вы выиграли вы набрали ${total} очков` : `Вы проиграли вы набрали ${total} очков`;
