var btn = document.getElementById("play");


// вырезать 6 эл-т
function deleteElementArray(arr, numberItem){
    return arr.splice(numberItem, 1);
}

// Создание нового массива без ключа Id
let createNewArray =(arr) => {
    let newArr = [];
       arr.forEach(function(item){
           newArr.push({
               url: item.url,
               name: item.name,
               params: item.params,
               description: item.description,
               date: item.date
           });//end push
    });
    return newArr;
}

// обрезает строку до 15 символов и в конце добавляет троеточик.
let addThreePoint = (str) => (str.length > 15)? str.slice(0,15) + '...' : str;

// ф-ция отдеает нужную дату.
let setDateItem = (millisec) => {
    let d = new Date(millisec);
    return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}  ${d.getHours()}:${d.getMinutes()}}`;
}

//  возращает строку из значений объекта params
let createStrParams = (obj) => `${obj.status} => ${obj.progress}`

// Применяем метод map для модификации свойств
let modifyNewArray = (arr) => {
    return  arr.map(function(item) {
        return{
            url: `http://${item.url}`,
            name: item.name[0].toUpperCase() + item.name.slice(1).toLowerCase(),
            params: createStrParams(item.params),
            description: addThreePoint(item.description),
            date: setDateItem(item.date),
            isVisible: item.params.status
        };
    });
}

let showIsVisible = (arr) => {
    let array = arr.filter(function (item) {
        return item.isVisible == true;
    });
    return array;
}
let printResult = (result) => console.log( result );

//Основная ф-ция запуска
function transform() {
    deleteElementArray(data, 1);
    let res = showIsVisible( modifyNewArray( createNewArray(data) ) );
    printResult(res);
}

btn.addEventListener("click", transform);