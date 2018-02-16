(function(){
    let selectSort = document.getElementById('type-selector'),
    btnAddItem = document.getElementById('play'),
    result = document.getElementById('resultHTML'),
    initArrData = [],  //массив с исходными данными
    visibleArr = [], // массив видимых эл-тов
    hiddenArr = [],  // массив удаленых эл-тов
    counterAddItem = 0, // счетчик считает кол-во добавленых эл-тов на страницу
    counterAvailableItem = 0, // счетчик считает какое кол-во еще можно добавить на страницу.
    countUnavail = document.getElementById('countUnavail'),
    countAvail = document.getElementById('countAvail');

   
    /********** ПОЛУЧЕНИЕ ИСХОДНЫХ ДАННЫХ ДЛЯ РАБОТЫ**********/
    let checkUrl = (str) => {return ~str.indexOf('://')? str: `http://${str}`}
    let checkName = (str) => {return (str)?` ${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`:str }
    let modifyDesc = (str) => {return (str)? `${str.slice(0,15)}...`:''};
    let getDate = (num) => { return moment(num).format('YYYY/MM/DD hh:mm:ss')}
   
    let createInitialArr = (arr) =>{
        let tempArr = [];
        arr.forEach( item  => {
            tempArr.push({
                url: checkUrl(item.url),
                name: checkName(item.name),
                id: item.id,
                desc: modifyDesc(item.description),
                date: item.date,
                modifyDate: getDate(item.date)
            });
        });
         return tempArr; 
    }//
    initArrData = createInitialArr(data);
    /********** ПОЛУЧЕНИЕ ИСХОДНЫХ ДАННЫХ ДЛЯ РАБОТЫ **********/
    let createHtmlItem = (item) => {
        return `<div class="col-md-3 col-sm-4 col-xs-6">
                    <div class="thumbnail">
                        <img src="${item.url}" alt="foto-${item.name}">
                         <div class="caption">
                            <h3>${item.id} : ${item.name}</h3>
                            <p>${item.desc}</p>
                            <p>${item.modifyDate}</p>
                            <button data-id='${item.id}' id="btnDelItem" class="remove"> Удалить </button>
                         </div>
                    </div>
                </div>`
    }//

    /********** СПОСОБЫ ОТОБРАЖЕНИЯ  **********/
    let sortFromAtoY = (arr) => { arr.sort((a,b) => {return (a.name > b.name)? 1 : -1 ; })};
    let sortFromYtoA = (arr) => { arr.sort((a,b) =>{return (a.name > b.name)? -1 : 1 ;  })};
    let sortFromOldToNew = (arr) => { arr.sort((a,b) => { return a.date-b.date;})};
    let sortFromNewToOld = (arr) => { arr.sort((a,b) =>{ return b.date-a.date;})}

    //способ отображения согласно выбранной сортировки
    let selectSorting = (val,arr) => {
       let temp = null;
        switch(val){
            case '0': temp = sortFromAtoY(arr);
                break;
            case '1': temp = sortFromYtoA(arr);
                break;
            case '2': temp = sortFromNewToOld(arr);
                break;
            case '3': temp = sortFromOldToNew(arr);
                break;    
        }
        return temp;
    }//

    /********** Ф-ЦИЯ ПОЛУЧАЕТ ЗНАЧЕНИЕ СЕЛЕКТА И ВЫЗЫВАЕТ КАКИМ МЕТОДОМ СТРОИТЬ  **********/
    let getValueSelect = (arr) => {
        let valueSelect =  selectSort.value;
        localStorage.setItem('firstSelect',valueSelect);
        selectSorting(valueSelect, arr);
    }//

    // При загрузке дока проверяет какой выбран фильтр для постройки галлереи
    function loadSettings() {
        countAvail.innerHTML = initArrData.length
        if( localStorage.getItem('firstSelect') !== null){
            selectSort.value = localStorage.getItem('firstSelect');
        }
        return selectSort.value;
    }
    /********** ОТОБРАЖЕНИЕ ITEM-ов  **********/
    function printResult(arr){
        let res = ''
        arr.forEach(function(item){
            return res += createHtmlItem(item);
        })
    
       countUnavail.innerHTML = counterAddItem;
       countAvail.innerHTML = counterAvailableItem;
       result.innerHTML = res;
    }//


   // ф-ция выводи модальное окно когда все item добавлены 
    function checkAddItem(){
        console.log(counterAvailableItem)
        if(counterAvailableItem <= 0){
            btnAddItem.classList.add('disabled'); 
            btnAddItem.setAttribute('data-target','.bs-example-modal-lg');
            btnAddItem.removeEventListener('click',showItemHtml);
            $('bs-example-modal-lg').modal('toggle');
        }else{
            btnAddItem.addEventListener('click', showItemHtml); 
            btnAddItem.removeAttribute('data-target');
            btnAddItem.classList.remove('disabled');
        }
    }    

    //Добавление эл-тов в массив видимых элементов
    function showItemHtml(e){
        e.preventDefault();
        if( hiddenArr.length > 0 ){
            visibleArr.push(hiddenArr.shift());
        }else{
            visibleArr[visibleArr.length] = initArrData[visibleArr.length];    
        }
       // Длинна видимого массива т.е сколько э-тов уже добавленно
        counterAddItem = visibleArr.length;
        counterAvailableItem = initArrData.length - counterAddItem;
        checkAddItem();
        getValueSelect(visibleArr);
        printResult(visibleArr)
        return initArrData;
    }

/************************ УДАЛЕНИЕ ЭЛЕМЕНТА  ************************/
   
    function findRemoveItem(e){
        e.preventDefault();
        if( e.target.classList.contains('remove') ){ 
            let id = e.target.getAttribute('data-id');
            removeItem(id,visibleArr,hiddenArr);
            checkAddItem(); 
            printResult(visibleArr);  
        }
    }

    let removeItem = (id, visibleArr, hiddenArr) =>{
        let elem = null;
        visibleArr.forEach( (item,index) => { (item.id == id)? elem = visibleArr.splice(index,1): null; });              
        hiddenArr.push(elem[0]);
        counterAddItem = visibleArr.length;
        counterAvailableItem = initArrData.length - counterAddItem;
    }

    /********** Ф-ЦИЯ НА КОТОРУЮ ПОДПИСАН СЛУШАЕТЛЬ КОГДА МЕНЯЕТЬСЯ ЗНАЧЕНИЕ ФИЛЬТРАЦИИ  **********/
    let updateSortingMethod =(e) =>{
        getValueSelect(visibleArr);
        printResult(visibleArr)
    }

    // ф-ция всех слушателей
    function listener(){
        btnAddItem.addEventListener('click', showItemHtml); 
        result.addEventListener('click', findRemoveItem); 
        selectSort.addEventListener('change', updateSortingMethod);
        document.addEventListener('DOMContentLoaded', loadSettings); 
    }
    
    function init(){
        listener();
    };
    init();
    
})()