
class CarsGallery {
	constructor(){
		this.galleryDate = null;
		this.url = "http://localhost:3000/cars/"
		this.galleryBlock = document.querySelector('#gallery-block');
		this.mainGalleryBlock = document.querySelector('.menuGallery');
		this.groupBtn = document.querySelector('.control-btn-card');
		this.btnAddItem = document.querySelector('.btnBackToLogForm');
				
		this.btnSaveData = document.querySelector('.btnSaveData');
		this.dataUrl = document.querySelector('.dataUrl');
		this.dataName = document.querySelector('.dataName');
		this.dataDesc = document.querySelector('.dataDesc');
		this.dataId = document.querySelector('.dataId');
		this.dataDate = document.querySelector('.dataDate');

		this._marker = null;
		this.modalForm = document.querySelector('.form-edit-data');
		this.blockLargeImg = document.querySelector('.showLargeImg');
        this.closeWindow = document.querySelector('.closeWindow');
	}
	
	static isInitObj() {
		if(localStorage.getItem('state')){ 
			return CarsGallery._inst;
		}
		CarsGallery._inst = this;
		localStorage.setItem("state","true")
	}	

	getGalleryDate(){
		fetch( this.url)
			.then(responce => responce.json())
            .then(responce => {
				this.saveData(responce);
				this.buildGallery();
			})   
	}
	//сохранить возвращенные данные
	saveData(data) {
		this.galleryDate = serviceGallery.modifyData(data);
	}

	/**************************************************************/ 

	// ф-ция работы с данными сервера
	sendResponseAndUpdate(url, options){
		fetch(url, options).then(responce => responce.json())
		.then(data => {
			this.getGalleryDate();
		});
	}

	//Смотрим какая кнопка была нажата 
	buttonHandler(event){
		event.preventDefault();
		let isButton = event.target.getAttribute('data-type-btn');
		isButton && this.evenBtntHandler(isButton, event);
	}

	evenBtntHandler(type, event){
		switch(type){
			case "viewBtn" : 
					var id = event.target.closest('.card').getAttribute('data-id-remove');
					this.showPrevieImg(id);
					this.blockLargeImg.style.top = "50%";
				break;
			case "addBtn" : 
					this.modalForm.style.top = "50%";
					this._marker = "addBtn"
				break;
			case "editBtn":
					var id = event.target.closest('.card').getAttribute('data-id-remove');
					this.fillInputFieldForm(id,event);
					this.modalForm.style.top = "50%"; 
					this._marker = "editBtn"
				break;
			case "delBtn" :
					var id = event.target.closest('.card').getAttribute('data-id-remove');
					this.removeItemGallery(id);
				break;	
		}//end switch;
	}//

	// выбирает какое событие запустить в зависимости что инициировал
	selectEvent(event){
		event.preventDefault();
		( this._marker == "addBtn")? this.addItemGallery() : this.editItemGallery();
		this._marker = null;
	}

	showPrevieImg(id){
		fetch(this.url+id).then(responce => responce.json())
		.then(data => {
			this.blockLargeImg.style.backgroundImage = ~data.url.indexOf('://')?`url(${data.url})`: `url(http://${data.url})`;
		});

		
	}//
	closeModalWindow(event){
		event.target.closest('.showLargeImg').style.top = "";
		this.blockLargeImg.style.backgroundImage = '';
	}//

	// если открыты форма для редактирования заполняет поля формы.
	fillInputFieldForm(id,event){ 
		// this.galleryDate
		this.galleryDate.filter( (item) => {
			if(item.id == id){
				this.dataUrl.value = item.url;
				this.dataName.value = item.name;
				this.dataDesc.value = item.description;
				this.dataId.value = item.id;
				this.dataDate.value = item.date;
			}
		});
	}
	
	editItemGallery(){
		let id = this.dataId.value;
		let body = {
			"url": this.dataUrl.value,
			"name": this.dataName.value,
			"description": this.dataDesc.value,
			"date" : this.dataDate.value,
		}
		 let options =  {
		 	method : 'PUT',
		 	headers: {
				 'Content-Type': 'application/json'
		 	},
		 	body : JSON.stringify(body)
		}
		
		this.sendResponseAndUpdate(this.url+id, options);
		this.hideModalForm();
	}//

	// добавляет эле-т галлереи
	addItemGallery(){
		let body = {
			"url": this.dataUrl.value,
			"name": this.dataName.value,
			"description": this.dataDesc.value,
			"date": Date.now()
		}
		let options = {
			method: "POST",
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(body)
		}
		this.sendResponseAndUpdate(this.url, options);
		this.hideModalForm();
		
	}//

	//очищает поля формы после отправки запроса на сервер
	hideModalForm(){
		this.modalForm.style.top = ""; // возвращаем значение которое указано в стилях чтобы скрыть форму
		this.dataUrl.value = '';

		this.dataName.value= '';
		this.dataDesc.value = '';
		this.dataId.value = '';
		this.dataDate.value = '';

	}//

    // удаляет эл-т галлереи
	removeItemGallery(id){
		let options =  {
			method : 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=utf-8'
			}
		};
		this.sendResponseAndUpdate(this.url+id, options);
	}

	/**************************************************************/ 
	// постройка галлереи 
	buildGallery(){
		let result = this.galleryDate.map((item) => serviceGallery.templateCard(item))
		this.galleryBlock.innerHTML = result.join('');
	}

	initListener(){
		this.mainGalleryBlock.addEventListener('click', this.buttonHandler.bind(this) );
		this.btnSaveData.addEventListener('click', this.selectEvent.bind(this));
		this.closeWindow.addEventListener('click', this.closeModalWindow.bind(this));
		
	}

	initComponent(){
		this.getGalleryDate();
		this.initListener();
		CarsGallery.isInitObj();
		
	}
}
