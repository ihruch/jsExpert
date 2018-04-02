class BaseGallery {	
    constructor(){
	this.gallery = document.querySelector('#gallery'),
	this.dropdownName0 = document.querySelector('#dropdown-name a.dropdown-item[sorting-type="0"]'),
	this.dropdownName1 = document.querySelector('#dropdown-name a.dropdown-item[sorting-type="1"]'),
	this.dropdownDate0 = document.querySelector('#dropdown-date a.dropdown-item[sorting-type="2"]'),
	this.dropdownDate1 = document.querySelector('#dropdown-date a.dropdown-item[sorting-type="3"]'),
	this.galleryData = [],
	this.resultHTML = '',
	this.status = false;
	this.title = document.querySelector('h1.jumbotron-heading');
	this.modal = document.querySelector('#modal');
	this.modalContent = document.querySelector('#'+this.modal.id+' .modal-content .modal-body');
}



	init(){
			this.initListeners();
			this.prepareGalleryData();
			this.status = true;
		
		this.printData(this.galleryData);
		this.title.innerText = 'Автомобильная галерея LITE';

	};

	initListeners (){
		this.dropdownName0.addEventListener('click', this.updateSortingMethod.bind(this));
		this.dropdownName1.addEventListener('click', this.updateSortingMethod.bind(this));
		this.dropdownDate0.addEventListener('click', this.updateSortingMethod.bind(this));
		this.dropdownDate1.addEventListener('click', this.updateSortingMethod.bind(this));
		this.gallery.addEventListener('click', this.checkListener.bind(this));
	};


	checkListener(e){
		e.preventDefault();
		if(e.target.classList.contains('remove')){
			this.removeItem(e);
		} else if(e.target.classList.contains('view')){
			this.showDetailedItem(e);
		} else if(e.target.classList.contains('edit')){
			this.editItem(e);
			console.log('edit')
		}
	};


	getSortingMethod(param){
		let method = null;
		switch(param){
			case '0': method = utils.sortNameASK
			break;
			case '1': method = utils.sortNameDESC
			break;
			case '2': method = utils.sortDateASK
			break;
			case '3': method = utils.sortDateDESC
			break;
			default: method = utils.sortDateASK
		}
		return method;
	};

 	sortItems(array, param){array.sort(param)};

	updateSortingMethod(e){
		e.preventDefault();
		this.sortItems(this.galleryData, this.getSortingMethod(e.target.getAttribute('sorting-type')));
		localStorage.setItem('storageMethod', e.target.getAttribute('sorting-type'));
		this.printData(this.galleryData);
	};

	defaultSorting (array){
		let storageMethod = localStorage.getItem('storageMethod');
		if(storageMethod){
			this.sortItems(array, this.getSortingMethod(storageMethod));
		} else {
			this.sortItems(array, this.getSortingMethod(0));
		}
	};

	prepareGalleryData(){
		fetch("http://localhost:3000/cars").then(responce => responce.json())
		.then(cars => {
			this.galleryData = cars;
			this.printData(this.galleryData);
		});
	};

	printData(dataArr){
		this.resultHTML = '';
		for(let i = 0; i < dataArr.length; i++){
			this.resultHTML += utils.getItemTemplate(dataArr[i], 'base');
		}
		this.gallery.innerHTML = this.resultHTML;
	};

	showDetailedItem(e){
		let url = e.target.getAttribute('item-url');
		this.modalContent.innerHTML = utils.getDetailedItemTemplate(url); 
		$(this.modal).modal();
	}
};

//ExtendedGallery//

class ExtendedGallery extends BaseGallery{
	constructor(){ 
	super(); //наследуем свойства родителя
	this.add = document.querySelector('#next-page');
	this.galleryStats = document.querySelector('.gallery-stats');
	this.visibleCount = document.querySelector('#visibleCount');
	this.availableCount = document.querySelector('#availableCount');
	this.title.innerText = 'Автомобильная галерея PRO'
}

	init(){
		this.prepareGalleryData();
		if(!this.status){
			this.initListeners();
			this.status = true;
		};
		this.add.classList.remove('hide')
	};

	initListeners(){
		super.initListeners.apply(this); //наследуем события родителя
		this.add.addEventListener('click', this.addNewItem.bind(this));
    };

	sendResponseAndUpdate(url, options){
		fetch(url, options).then(responce => responce.json())
		.then(data => {
			this.prepareGalleryData();
		});
	}
 
	getFormAddData(){
		let name = document.querySelector('#'+this.modal.id+' #formName').value;
		let url = document.querySelector('#'+this.modal.id+' #formUrl').value;
		let description = document.querySelector('#'+this.modal.id+'  form #formDescription').value;
		return {
			name:name,
			url:url,
			description:description
		}
	}
	addNewItem(e){
		e.preventDefault();
		this.modalContent.innerHTML = utils.showModalAdd();//формируем форму добавления ел.
		$(this.modal).modal();

		let submitNewItemBtn = document.querySelector('#'+this.modal.id+' button');
		submitNewItemBtn.addEventListener('click', this.submitNewItem.bind(this));	
	};

	submitNewItem(e){
		e.preventDefault();
		let errorDiv = document.querySelector('#'+this.modal.id+' .error');
		let name = this.getFormAddData().name;
		let url = this.getFormAddData().url;
		let description = this.getFormAddData().description;
		if((name != '') && (url != '') && (description != '')){
			let body = {
				"url": url,
				"name": name,
				"description": description,
				"date": Date.now()
			}
			
			let options =  {
				method : 'post',
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				},
				body : JSON.stringify(body)
			}
			

			this.sendResponseAndUpdate('http://localhost:3000/cars', options);
			$(this.modal).modal('hide')
		} else {
			errorDiv.innerHTML = 'Заполните пустые поля!';
		}
		
	}

	removeItem(e){
		let id = e.target.getAttribute('item-id');
		let options =  {
			method : 'delete',
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			}
		}
		this.sendResponseAndUpdate('http://localhost:3000/cars/'+id, options);
	};

	editItem(e){
		e.preventDefault();
		let id = e.target.getAttribute('item-id');
		let gettedData = [];
		$(this.modal).modal();
	
		fetch('http://localhost:3000/cars/'+id).then(responce => responce.json())
		.then(data => {
			gettedData = data;
			console.log(data)
			this.modalContent.innerHTML = utils.showModalEdit(data);
					
		let submitEditItemBtn = document.querySelector('#'+this.modal.id+' button');
		submitEditItemBtn.addEventListener('click', this.submitEditedItem.bind(this));
		});	
	};

	submitEditedItem(e){
		e.preventDefault();
		let id = e.target.getAttribute('item-id');
		console.log('изменить')
		let body = null;
		body = {
			"url": this.getFormAddData().url,
			"name": this.getFormAddData().name,
			"description": this.getFormAddData().description
			
		}

		let options =  {
			method : 'put',
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			},
			body : JSON.stringify(body)
		}
		this.sendResponseAndUpdate('http://localhost:3000/cars/'+id, options);
		$(this.modal).modal('hide')

	}

	printData(dataArr){
		this.resultHTML = '';
		for(let i = 0; i < dataArr.length; i++){
			this.resultHTML += utils.getItemTemplate(dataArr[i], 'extended');
		}
		this.gallery.innerHTML = this.resultHTML;
	};


}