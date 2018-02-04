// 1. Из данного массива удалить значение «technics». Все остальное превратить в строку формата «foods, fruits…»
// преобразование в строку выполнить с помощью одного метода.

let goods = ['foods', 'fruits', 'technics', 'phones', 'computers', 'technics','technics','phones'];

let obj = {};
for (var i = 0; i < goods.length; i++) {
    let key = goods[i];
    obj[key] = true;
}
console.log( Object.keys(obj) );

var arr = [];
for (var i = 0; i < goods.length; i++) {

    if(arr.indexOf(goods[i])<0 ) arr.push(goods[i]);
}
console.log( arr );

var newArr = goods.filter(function (item, index, arr) {
   return  index == arr.indexOf(item);
});

console.log( newArr );

