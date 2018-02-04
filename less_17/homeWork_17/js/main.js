var btn = document.getElementById("play");


// вырезать  эл-т
function deleteElementArray(arr, numberItem){
    return arr.splice(--numberItem, 1);
}

// Создание нового массива без ключа Id
let createNewArray =(arr) => {
    let newArr = [];
       arr.forEach( (item) =>
           newArr.push({
               url: item.url,
               name: item.name,
               params: item.params,
               description: item.description,
               date: item.date
           })//end push
        );
    return newArr;
};

// обрезает строку до 15 символов и в конце добавляет троеточик.
let addThreePoint = (str) => (str.length > 15)? str.slice(0,15) + '...' : str;

// ф-ция отдеает нужную дату.
let setDateItem = (millisec) => {
    // let d = new Date(millisec);
    // return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}  ${d.toLocaleTimeString({hour:"2-digit"})}`;
    return moment(millisec).format('YYYY/MM/DD  hh:mm:ss');
};

//  возращает строку из значений объекта params
let createStrParams = (obj) => `${obj.status} => ${obj.progress}`;

// проверяет url на наличие http
let checkUrl = (str) => ~str.indexOf('http://')? str : `http://${str}` ;

// преобразует поле name что бы начиналось с большой буквы, а сотальные были будквы маленького регистра
let firstChartToUpperCase = (str) =>  (str)? `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`: '';

// Применяем метод map для модификации свойств
let modifyNewArray = (arr) => {
    return  arr.map( (item) => {
        return{
            url: checkUrl(item.url),
            name: firstChartToUpperCase(item.name),
            params: createStrParams(item.params),
            description: addThreePoint(item.description),
            date: setDateItem(item.date),
            isVisible: item.params.status
        };
    });
};

let showIsVisible = (arr) => {
    return array = arr.filter((item) => item.isVisible );
};

let printResult = (result) => console.log( result );

//Основная ф-ция запуска
function transform() {
    deleteElementArray(data, 6);
    let res = showIsVisible( modifyNewArray( createNewArray(data) ) );
    printResult(res);
}

btn.addEventListener("click", transform);