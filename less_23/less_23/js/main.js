(function (){
// Получаем главные блоки html кода

    let btnPlay = document.getElementById('play'),
        counter = document.getElementById('count'),
        result = document.getElementById('result'),
        delBTN = document.getElementById('delBTN'),
        count = 1,
        newArr = [],
        lengthData = data.length,
        sortABC = document.getElementById('type-selector'),
        sortNewItem = document.getElementById('line-selector');

    /*******************ПОЛУЧЕНИЕ НУЖНЫХ ДАННЫХ ДЛЯРАБОТЫ*************************/
    function checkURL(str) {
            return ~str.indexOf('://')? str: `http://${str}`;
    }
    function modifyNAME(str) {
        return (str)?`${str[0].toUpperCase()}${str.slice(1).toLocaleLowerCase()}`: '';
    }
    function modifyDescription(str) {
        return (str)? `${str.slice(0,15)}...`:'';
    }
    function modifyDate(number) {
        return moment(number).format('YYYY/MM/DD hh:mm:ss')
    }
    // ф -ция получения данных с объекта
    function createArray(data){
        var newConfArr = [];
        data.forEach(function(item){
            newConfArr.push({
                url: checkURL(item.url),
                name: modifyNAME(item.name),
                id : item.id,
                description : modifyDescription(item.description),
                date : item.date,
                newDate: modifyDate(item.date)
            })
        });// end forEach
        return newConfArr;
    }// end createArray

    /*******************ШАБЛОН ОТОБРАЖЕНИЯ ITEM************************/
    let templateCreateItem = function(arr){
        let itemTemplate = '';
         arr.forEach((item)=>{
             itemTemplate += `<div class="col-md-3 col-sm-4 col-xs-6">\
                                    <div class="thumbnail">\
                                         <img src="${item.url}" alt="foto-${item.name}">\
                                         <div class="caption">\
                                             <h3>${item.id}: ${item.name}</h3>\
                                             <p>${item.description}</p>\
                                             <p>${item.newDate}</p>\
                                             <button id="delBTN">Удалить</button>\
                                         </div>\
                                   </div>\
                                </div>`;

         })
        result.innerHTML =  itemTemplate;
    };

    //ф-ция вывода кол-во item на экране
    function visibleCounter(count) {
        counter.innerHTML = count;
    }
    // ф-ция подсчета Item на экране
    function disableBtn(count) {
        if (count > lengthData) {
            btnPlay.classList.add('disabled');
            btnPlay.removeEventListener('click', init);
        }

    }





    /*******************БЛОК ОТОБРАЖЕНИЯ ГАЛЕРЕИ О ПЕРВОМУ  СЕЛЕКТУ*************************/
    //ф-ция делает выборку какие эл-ты добавлять для вывода т.е создаем второй массив который отвечает за вывод инфы
    let creatElemHtml = function (arr){
        let tempryArr = [];
        visibleCounter(count);
        arr.length = count;
        let paramMY = arr.filter(function (item) {
            for (var i = 0; i < tempryArr.length; i++) {
                if(item.id != tempryArr.id) tempryArr.push(item);
            }
            return tempryArr;
         });
        ++count;
        disableBtn(count);
        return paramMY;
    };
    // находит нужный блок HTML кода и удаляет этот item  с массива
    function deleteElemHtml(e){
        visibleCounter(--count-1);
        let target = e.target;
        let el = target.closest('.col-xs-6');
        let delItem = el.parentNode.removeChild(el);
        let idDel = delItem.getElementsByTagName('h3')[0].innerHTML[0];

        for (var i = 0; i < newArr.length; i++) {
            if(newArr[i].id == idDel){
                newArr.splice(i,1);
            }
        }
        templateCreateItem(newArr);
        disableBtn(count);
        return newArr;
    };


    /*******************БЛОК ОТОБРАЖЕНИЯ ГАЛЕРЕИ О ПЕРВОМУ  СЕЛЕКТУ*************************/

    // ф-ция сортировки по полю name от а-я
    let sortNameAY = (arr) =>{
            let callator = new Intl.Collator();
            return arr.sort((a,b) => { return callator.compare(a.name, b.name); });
    }// end sortNameAY

    //ф-ция перестраивает галлерею в обратном порядке.
    let sortNameYA = (arr) =>{
            let callator = new Intl.Collator();
            return arr.sort((a,b) => { return callator.compare(b.name,a.name); });
    }// end sortNameYA

    let variableSortABC = [sortNameAY, sortNameYA];
    function showSelectABC() {
        let valSelect = sortABC.value;
        switch (valSelect){
            case '0':
                templateCreateItem( variableSortABC[0](newArr)) ; //генерит html
                break
            case '1':
                templateCreateItem( variableSortABC[1](newArr));
                break
        }
    }

    /*******************БЛОК ОТОБРАЖЕНИЯ ГАЛЕРЕИ ПО ВТОРОМУ СЕЛЕКТУ*************************/
    let defaultValue = (arr) => { alert('This default value!'); };
    let beginNewItem = (arr) =>{ return arr.sort((a,b) => {return b.date-a.date})};
    let beginOldItem = (arr) =>{ return arr.sort((a,b) => {return a.date-b.date})};
    let variableSortNewItem = [defaultValue, beginNewItem, beginOldItem ];

    function showSelectNewItem() {
        let valSelect = sortNewItem.value;
        switch (valSelect){
            case '0':
                     templateCreateItem( variableSortNewItem[0]()) ; //генерит html
                break;
            case '1':
                     templateCreateItem( variableSortNewItem[1](newArr));
                break;
            case '2':
                     templateCreateItem( variableSortNewItem[2](newArr));
                break;
        }
    }

    /*******************Ф-ЦИЯ ИНИЦИАЛИЗАЦИИ*************************/
    // ф-ция инициализации
    function init() {
        //сделали выборку только тех данных который нам нужны
        let newData = createArray(data); // эта ф-ция формирует массив из которого берутся данные для отображения.
        newArr = creatElemHtml(newData);
        showSelectABC();

    console.log( newArr );
    }// end function init

    /*******************Event*************************/
    btnPlay.addEventListener('click', init);
    result.addEventListener('click', deleteElemHtml);
    sortABC.addEventListener('change', showSelectABC);
    sortNewItem.addEventListener('change', showSelectNewItem);
})();


