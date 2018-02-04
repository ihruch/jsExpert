(function(){
// получение блоков в которые будут вставлены методы отображения гелереи   
let btn = document.getElementById("play"),
    firstBlock = document.querySelector('#first-line'),
    secondBlock = document.querySelector('#second-line'),
    thirdBlock = document.querySelector('#third-line'),
    first_group = document.querySelector('.first-group'),
    second_group = document.querySelector('.second-group'),
    third_group = document.querySelector('.third-group');

// Проверка url
let checkURL = function (str) {
    return  ~str.indexOf('://')? str : `http://${str}`;
};

//Преобразование поля name
let changeFieldName = function (str) {
    return (str)? `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`: '';
};

// Преобразование строки
let shortDescription = function (str) {
    return  (str.length > 15)? `${str.slice(0,15)}...` : str;
}

// Преобразование даты
let getDate = function (millisec) {
    return moment(millisec).format("YYYY/MM/DD hh:mm:ss ");
}

// ф-ция формирует новые массив с нужными данными
let createArray = function (arr) {
    let newArr = [];
    arr.forEach(function (item) {
        newArr.push({
                url: checkURL(item.url),
                name: changeFieldName(item.name),
                description: shortDescription(item.description),
                date: getDate(item.date)
            })
    })// end forEach
    return newArr;
}

//  МЕТОДЫ ОТОБРАЖЕНИЯ ИНФОРМАЦИИ
// метод replace
var replaceItemTemplate = (arr) => {
    let resultHTML = '';
    arr.forEach( (item) => {
        let template = '<div class="col-sm-3 col-xs-6">\
                         <img src="$url" alt="$name" class="img-thumbnail">\
                         <div class="info-wrapper">\
                            <div class="text-muted">$name</div>\
                            <div class="text-muted top-padding">$description</div>\
                            <div class="text-muted">$date</div>\
                         </div>\
                         </div>';
        resultHTML += template
            .replace(/\$name/gi, item.name)
            .replace("$url", item.url)
            .replace("$description", item.description)
            .replace("$date", item.date);

    })//end forEach
    firstBlock.innerHTML = resultHTML;
}; //end replaceItemTemplate

let stringItemTempate = (arr) => {
    let template = '';
    arr.forEach( (item) => {
        template += `<div class="col-sm-3 col-xs-6">\
                           <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                           <div class="info-wrapper">\
                                <div class="text-muted">${item.name}</div>\
                                <div class="text-muted top-padding">${item.description}</div>\
                                <div class="text-muted">${item.date}</div>\
                            </div>\
                        </div>`;
    });// end forEach
    secondBlock.innerHTML = template;
};// end stringItemTempate

let domItemTempalate = (arr) => {
     thirdBlock.innerHTML = '';
     arr.forEach((item) => {
        // постреение через дом модель
        let div = document.createElement('div');
        div.className = 'col-sm-3 col-xs-6';

        let img = document.createElement('img');
        img.className = 'img-thumbnail';
        img.alt = `${item.name}`;
        img.src = `${item.url}`;
        div.appendChild(img);

        let div2 = document.createElement('div');
        div2.className = 'info-wrapper';
        div.appendChild(div2);

        let div3 = document.createElement('div');
        div3.className = 'text-muted';
        div3.innerHTML = `${item.name}`;
        div2.appendChild(div3);

        let div4 = document.createElement('div');
        div4.className = 'text-muted top-padding';
        div4.innerHTML = `${item.description}`;
        div2.appendChild(div4);

        let div5 = document.createElement('div');
        div5.className = 'text-muted';
        div5.innerHTML = `${item.date}`;
        div2.appendChild(div5);
        thirdBlock.appendChild(div);
    })//end forEach
}; // end domItemTempalate

let defaultShowTempalate = function() {
    return;
}//
    
// массив ф-ции возможных способов построениея галереи.
var arrayCreateMethod = [defaultShowTempalate, replaceItemTemplate, stringItemTempate, domItemTempalate];


// ф-ция выводы кол-во Item-ов на экран.
function outputAmountItem(data,typeShowItems,amountShowItems,arrFunction) {
   switch (amountShowItems) {
        case "0":
            arrFunction[typeShowItems](data);
            break;
        case "1":
            data.length = 3;
            arrFunction[typeShowItems](data);
            break;
        case "2":
            data.length = 6;
            arrFunction[typeShowItems](data);
            break;
   } // end switch
}//

// ф-ция которая определяет какой блок показывать изходя из выбранного варианта.
function showBlock(num) {
    let arr = [first_group, second_group, third_group];
    for (var i = 0; i < arr.length; i++) {
       arr[i].classList.add('hide');
    }
   arr[num-1].classList.toggle('hide');
}//

// функция запуска
function init() {
   let typeShowItems = document.getElementById('type-selector').value;
   let amountShowItems = document.getElementById('line-selector').value;
   showBlock(typeShowItems);

   let dataArray = createArray(data);
   outputAmountItem(dataArray, typeShowItems, amountShowItems, arrayCreateMethod);
} //end function init

btn.addEventListener("click", init);
})() // END MODULE

