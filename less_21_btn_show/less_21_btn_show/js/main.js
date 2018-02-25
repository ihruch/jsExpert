(function(){
    var  gallery = document.getElementById('result'),
         nextBtn = document.querySelector("#next-page"),
         textAmount = document.querySelector('#textAmount'),
         availableCount = document.querySelector('.availableCount'),
         counterAvailableItem = null,
         dateDropdown = document.querySelector('#dropdown-date');


    var galleryDate = [],
        pageService = {
            itemPerPage : 3,
            currentPage : 0
        }
/********************************************************************/      
    function duplicateArray(){
        galleryDate = galleryService.modifyArray( galleryService.duplicateArr(data,1) );
        // console.log(galleryDate);
        counterAvailableItem = galleryDate.length-pageService.itemPerPage; // устанавливает счетчику начальное значение равное длинне массива
    }//
/********************************************************************/

    function initListener(){
        nextBtn.addEventListener("click", getNextPageHandler); 
        dateDropdown.addEventListener("click", sortingForDate) ;
        // window.addEventListener('scroll', infinitScroll);
    }//

/********************************************************************/
    //Ф-ция отменяет действие браузера и строить галерею
    function getNextPageHandler(event){
        event && event.preventDefault();
        buildGallery();
        isMaxPage() && blockNextPage();  
        // последняя строчка isMaxPage проверяет конец или нет массива данных, если 
        // конец запускает blockNextPage которая скрывает ф-цию и счетчики  
        
    }//

    // надо вернуть false когда список уже закончился
    function isMaxPage(){
        return pageService.currentPage * pageService.itemPerPage > galleryDate.length;
    }//

    // по окончанию прячет кнопку. Крутить больше некуда
    function blockNextPage() {
        nextBtn.setAttribute("disabled", true);
		nextBtn.classList.add("hide");
		availableCount.parentNode.classList.add("hide");
	}//

    // Ф-ция проверяет долистали до конца стр, если да то добавить следующийй блок.
    function infinitScroll(){
        if( window.pageYOffset + window.innerHeight >= document.body.offsetHeight){
            getNextPageHandler();
        }
    }//
   
    // При каждой постройке галереи считает доступное кол-во items
    function counterAvailableItems(){
        counterAvailableItem -= pageService.itemPerPage;
        return counterAvailableItem;
    }

    // рендерин нужную страниццу
    function createPage(){
        let start = pageService.itemPerPage * pageService.currentPage;
        let end = start + pageService.itemPerPage;
        pageService.currentPage++;
        availableCount.innerHTML = counterAvailableItem;
        
        return galleryDate.slice(start, end);

    }
/************************Сортировка по отборам***********************/
    function sortItems(methodSort){
        pageService.currentPage = 0;
        gallery.innerHTML = " ";
        galleryDate.sort(methodSort);
        buildGallery();
    }
    

    function sortingForDate(event){
        event.preventDefault();
        event.currentTarget.querySelector('button').innerHTML = event.target.innerText;

        let sortingType = event.target.getAttribute('date-type') 

        if( sortingType == 'new'){
            console.log('new date');
            sortItems( galleryService.sortDateAsc );	
            createPage()
        }

        if( sortingType == 'old'){
            console.log("old date");
            sortItems( galleryService.sortDateDesc);	    
            createPage()
        }
    }


    
/********************************************************************/    
    function buildGallery(){
        let page = createPage();
        let res = page.map( (item) => { 
            return galleryService.createTemplateHtml(item);
        });

        gallery.innerHTML += res.join('');
        textAmount.innerHTML = pageService.itemPerPage;
        availableCount.innerHTML = counterAvailableItem;
    }//

 
/********************************************************************/
  
    function init(){
        duplicateArray();
        buildGallery();
        initListener();
    }//
    init();


})()//