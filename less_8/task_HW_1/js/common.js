var first,second;
var sum = 0;

for (var i = 0; i < 15; i++) {
    if ((i == 8) || (i == 13)) continue;
     first = Math.floor((Math.random() * 6) + 1);
     second = Math.floor((Math.random() * 6) + 1);
     sum += first + second;

    if (first == second ){
        document.getElementById("result").innerHTML += "Выпал дубль. Число " + first + " | ";
    }

    if( (first < 3) || (second >=4) ){
        document.getElementById("result").innerHTML += "Большой разброс между костями. Разница составлет " + (second - first)+ " | ";
    }

    document.getElementById("result").innerHTML += "Первая кость: " + first + " Вторая кость: " + second + "<br>";
}// end for

document.getElementById("summ").innerHTML = (sum > 100)? "Вы выиграли вы набрали 100 очков" : "Вы проиграли вы набрали 100 очков";


