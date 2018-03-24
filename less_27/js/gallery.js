/* 
*  Схематическое изображение класса Галереи
*/

let BaseGallery = function () {	
	this.gallery = document.querySelector('#gallery-block');
	this.btnNextPage = document.querySelector('.btn-next-page');
	this.galleryData = [];
	this.configPage = {
		itemPerPage: 5,
		currentPage: 0
	}
	if(localStorage.getItem('state')){ return BaseGallery._inst; }
	BaseGallery._inst = this;
	localStorage.setItem('state',BaseGallery._inst)
}


BaseGallery.prototype = {
    prepareGalleryDate: function(){
		this.galleryData =  serviceGallery.modifyData(serviceGallery.duplicateData(data,1));
		// console.log(this.galleryData);
	},

	getNextPage: function(){
		let start = this.configPage.itemPerPage * this.configPage.currentPage;
		let end = start + this.configPage.itemPerPage;
		this.configPage.currentPage++;
		return this.galleryData.slice(start, end);
	},

	buildGallery: function(event){
		let page = this.getNextPage();
		let result = page.map( (item) => {return serviceGallery.templateCard(item)} );
		this.gallery.innerHTML += result.join('');
	},
	isMax: function(){
		return this.configPage.itemPerPage * this.configPage.currentPage > this.galleryData.length ;
	},
	
	getNextPageHandler : function(event){
		event && event.preventDefault();
		this.buildGallery();
		this.isMax() && serviceGallery.hideBlock(this.btnNextPage);
	},
	
	initListeners: function(){
		this.btnNextPage.addEventListener('click', this.getNextPageHandler.bind(this));
	}, 

	initComponent : function (){
		this.prepareGalleryDate();
		this.buildGallery();
		this.initListeners()
	}
}


// let ExtendedGallery = function() {
// 	BaseGallery.apply(this);
// 	this.property = {};
// }
// ExtendedGallery.prototype = {

// 	initListeners : function (){
// 		BaseGallery.prototype.initListeners.apply(this);
//     },

//     addImage: function (){
// 	    // новый метод которо нет у родителя
//     }
// }

// код функции наследования можно найти архиве, который содержится 
// в материалах к сессии 29 (практический пример)
// service.inheritance(BaseGallery, ExtendedGallery);