// 1. Создайте функцию, возвращающую слово «ворона» в правильной форме в зависимости от переданого числа n.
//    Например: На ветке сидит 1 ворона;
//    На ветке сидит 4 вороны; На ветке сидит 26 ворон.
let msg = 'На ветке сидит';
let worl = 'ворона';
let spc = ' ';

function out(num) {
    if( num == 1)console.log( msg + spc + num + spc + worl);

    if( num > 1 && num < 5){ console.log( msg + spc + num + spc + worl.slice(0,-1) + 'ы');}

    if(num >= 5){ console.log( msg + spc + num + spc + worl.slice(0,-1));}
}
out(1);
out(3);
out(26);


