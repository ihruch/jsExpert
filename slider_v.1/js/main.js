function Slide(selector, options){
    //объявили основные переменныеж    
    let slideNode = document.querySelector(selector),
        slideImagesWrap = slideNode.querySelector('.slide__images-wrap'),
        sliderDotsNode = slideNode.querySelector('.slider__dots'),
        btnNavPrev = slideNode.querySelector('.slider__navigation-prev'),
        btnNavNext = slideNode.querySelector('.slider__navigation-next'),

        currentSlideIndex = 0,
        imagesCount = slideImagesWrap.children.length,
        directionSlider = options.direction;
        slideSize = slideImagesWrap[(options.direction == 'vertical')?'offsetHeight':'offsetWidth'];
   
    this.nextSlide = function(){
        console.log(currentSlideIndex)
        if(currentSlideIndex === (imagesCount-1) ){
            currentSlideIndex = 0;
            return;
        }
         currentSlideIndex++;
    };

    this.prevSlide = function(){
        if(currentSlideIndex === 0 ){
            currentSlideIndex = (imagesCount-1) ;
            return;
        }
        currentSlideIndex--;
    };
    //шаблон строки для создания точек управления
    let createHtmlTemplate = (number) => {
        return `<li class="slider__dot-item" data-dot="${number}"></li>`
    };

    // генерация кол-во точек управления исходя из кол-во слайдов
    let createDotsItem = () =>{
        let res = ''
        for(let i = 0; i <imagesCount; i++){
            res += createHtmlTemplate(i);
        }
        sliderDotsNode.innerHTML = res;
    }
    // возможность по клику по точкам управления переходить на нужный слайд
    let clickDotsItem = (e) =>{
        if(e.target.tagName !=='LI') return;
        currentSlideIndex = +e.target.getAttribute('data-dot');
        this.__render();
        return currentSlideIndex;
    }//

    // рендер
    this.__render = function(){
        // прокрутка слайдов 
        slideImagesWrap.style[(options.direction == 'vertical')? 'marginTop':'marginLeft'] = -(currentSlideIndex * slideSize) + 'px';
        // отображение DOTS
         if (sliderDotsNode.querySelector('.active')){
            sliderDotsNode.querySelector('.active').classList.remove('active');
         }
         sliderDotsNode.children[currentSlideIndex].classList.add('active');
    }
    let checkShowDirection = () => {
        if(options.direction == 'vertical'){
            slideImagesWrap.style.whiteSpace = 'normal';
        }
    }
    let nextSlideNode = () =>{ 
        this.nextSlide();
        this.__render();
    }
    let prevSlideNode = () =>{
        this.prevSlide();
        this.__render();
    }
    let listener = () =>{
        btnNavNext.addEventListener('click', nextSlideNode);
        btnNavPrev.addEventListener('click', prevSlideNode);
        sliderDotsNode.addEventListener('click', clickDotsItem);
    };
    
    this.__init = function(){
        listener(); 
        createDotsItem();  
        checkShowDirection();
        this.__render();
    }
    this.__init();

}//

// console.log(slideImageWrap)