/* 
*  – Реализация с помощью прототипного наследования
*  – Работа с шаблоном и событиями в целом
*  – Дублирование массива с данными
*  – Работа preventDefault(). 
*  – Пейджинг, кнопка "Далее"
*  – Выбор всех элементов списка
*  – Выбор одного элемента списка
*  – Фильтрация элементов
*  – Сортировка элементов
*  – Поиск элементов по имени
*  – Работа с функцией Reduce
*  – Кастомные data атрибуты
*  – Работа с разными View
*  – Отображение полной информации об элементе
*/

(function(){
    let btnNextPage = document.querySelector('.btn-next-page'),
        userList = document.querySelector('#user-list'),
        statsUsers = document.querySelector('.statsUsers'),
        mainBlock = document.querySelector('.mainBlock'),
        dropdownEmail = document.querySelector('#dropdown-email'),
        dropdownRole = document.querySelector('#dropdown-role'),
        selectAll = document.querySelector('#selectAll'),
        inputSearch = document.querySelector('#inputSearch')
        btnBack = document.querySelector('.btnBack');

    let listData = [],
        pageService = {
            itemPerPage: 5,
            currentPage: 0
        };

    // дублирует исходный массив 
    function dublicateData(){
        listData = listService.duplicateData(users,1);
        // console.log(listData);
    }//

    // слушатели собыйтий
    function initListener(){
        btnNextPage.addEventListener('click', getNextPageHandler);
        userList.addEventListener('click', tableLinerHandler);

        dropdownEmail.addEventListener('click',sortingHandler);
        dropdownRole.addEventListener('click',sortingHandler);

        selectAll.addEventListener('click', selectAllItems);
        inputSearch.addEventListener('keyup', searchHandler);

        btnBack.addEventListener('click', backMainList);

    }// 
    function backMainList(event){
        event.preventDefault();
        mainBlock.innerHTML = '';
        buildUsersList();

    }//

    //ф-ция поиска
    function searchHandler(event){
        event.preventDefault();
        let value = event.target.value;    
        if (event.keyCode === 13 && (value.length == 0 || value.length >=2)){
            applySortingMethod("Find")
        } 
    }//


    // ф-ция изменение чеков при выборе всех
    function selectAllItems(){
        let checkboxes = userList.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach( (item) =>{ selectAll.checked? item.checked = true: item.checked = false  } )
    }
    // ф-ция присваивает надпись выбранного пункта меню, и определяем какой тип сортироки выбран
    function sortingHandler(event){
        event.preventDefault();
        event.currentTarget.querySelector('button').innerHTML = event.target.innerHTML;
        let sortingType = event.target.getAttribute('sorting-type');
        sortingType && applySortingMethod(sortingType);
    }//
    // применяет сортировку 
    function applySortingMethod(sortingType){
        userList.innerHTML = '';
        pageService.currentPage = 0;
        buildUsersList(config.sortingConfig[sortingType]);
    }//


    //обработчик где нажали на кнопку открыть или на самой строке
    function tableLinerHandler(e){
        let isButton = e.target.getAttribute("data-row-id");
        (isButton)? openWindowInfo(isButton) : fillSelectStrip(e);
    
    }//
    // нажали на строке значит ее надо выделить
    function fillSelectStrip(e){
        let linesTable = e.currentTarget.querySelectorAll("tr");
        linesTable.forEach( element => { element.classList.remove('table-active')});
        e.target.closest('tr').classList.add('table-active');
    }//
    // нажаи на кнопке открыть  -> открывает карточку 
    function openWindowInfo(id){
        mainBlock.innerHTML = '';
        let res = listData.find( (item) => {return item.id == id});
        mainBlock.innerHTML = listService.windowInfoUser(res);
    }

    // получение страницы
    function getPage(){
        let start = pageService.itemPerPage * pageService.currentPage;
        let end = pageService.itemPerPage + start;
        pageService.currentPage++;
        return listData.slice(start,end);
    }
    // постройка списка
    function buildUsersList(sortingType){
        let page = getPage();
        sortingType && (page = sortingType(page));
        let res = page.map( (item) => {return listService.templateRowTable(item)} );
        userList.innerHTML += res.join('');
        listService.initTooltip();
    }//

    //обрабатывает данные при переходе на след страницу.
    function getNextPageHandler(event){
        event && event.preventDefault();
        buildUsersList();
        if( isMax() ){
            blockNextPageHide();
            stateCount();
        }  
    }//
    // проверка не конец ли данных
    function isMax(){
        return pageService.currentPage * pageService.itemPerPage > listData.length;
    }//

    function blockNextPageHide(event){
        btnNextPage.classList.add('disabled');
    }//
    
    // если болеше нет данных для показа отображает данные по пользователям.
    function stateCount(){
        let stats = listData.reduce( (sum, item) => {
            (item.role == "Admin")? sum.admin++ : sum.user++ ;
            return sum;
        }, {admin:0,user:0});
        statsUsers.innerHTML = `Статистика пользователей: Админов: ${stats.admin}, Пользователей: ${stats.user}`

    }//



    function init(){
        dublicateData();
        buildUsersList();
        initListener();
        
    }//
    init();

})()//