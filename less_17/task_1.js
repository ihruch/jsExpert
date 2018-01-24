// 1. Из данного массива удалить значение «technics». Все остальное превратить в строку формата «foods, fruits…»
// преобразование в строку выполнить с помощью одного метода.
/*
let goods = ['foods', 'fruits', 'technics', 'phones', 'computers', 'technics','technics'];

while (true){
    let indItem = goods.indexOf('technics');
    if( indItem < 0) break;
    goods.splice(indItem,1);
}
console.log( goods.join(', ') );
*/
/*--------------------------------------------------------------------------------------------------*/
// 2. Преобразовать текущую дату и время в понятный человеку формат: 08:05 01/01/2018. Используя шаблонные строки.
/*
let d = new Date();
let currentDate = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` ;
console.log( currentDate );
*/
/*--------------------------------------------------------------------------------------------------*/
// 3. Напишите функцию, которая возвращает расширение файла.
// Например, getExt(«/home/user/project/script.js») вернет “js”. Функция должна принимать строку
/*
function getExt(str) {
    let ind = str.indexOf('.')
     console.log( str.slice(ind+1) ); //
}
getExt('/home/user/project/script.js');
*/
/*--------------------------------------------------------------------------------------------------*/
// 4. Напишите функцию, которая удаляет дубликаты из массива. Например, входной массив:
// [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6], массив который возвращает функция [1, 2, 4, 5, 7, 8, 3, 6]

// let arr = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6,6,6];
// function uniqueArr(arr){


    /*Первый вариант*/
    // let newArr = [];
    // arr.forEach(function (item) {
    //    if( newArr.indexOf(item) < 0 ) newArr.push(item);
    // })
    // return newArr;

    /*Второй вариант*/
    // var newArr = arr.filter(function (item, ind, arr) {
    //     return ind == arr.indexOf(item)
    // });
    // return newArr;

    /*Третий вариант*/
    // let obj = {};
    // arr.forEach(function (item) {
    //     let key = item;
    //     obj[key] = true;
    // })
    // return Object.keys(obj);



} // end

// console.log( uniqueArr(arr) );;
