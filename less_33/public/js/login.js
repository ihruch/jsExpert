class LoginForm{
	constructor(userData, validatorModule, CarsGallery ){
		this.userDate = userData;
		this.CarsGallery = CarsGallery;
		this.validator = validatorModule;
		this.url = "http://localhost:3000/user/"

		this.mainBlock = document.querySelector('main');
		this.menu = document.querySelector('.main-nav');
		this.msgErr = document.querySelector('.err-msg');
		this.formLog = document.querySelector('.form-signin');
		this.inpEmail = document.querySelector('#inputEmail');
		this.inpPass = document.querySelector('#inputPassword');
		this.btnLog = document.querySelector('.btn-login');
		
		this.galleryBlock = document.querySelector('.gallery-main-block');
		this.sectionLogPass = document.querySelector('.sectionLogPass');
		this.blockUserInfo = document.querySelector('.blockUserInfo');

		this.modalForm = document.querySelector('.form-edit-data');
		this.blockLargeImg = document.querySelector('.showLargeImg');

		this.userDateInfo = null;

	} //end constructor

	//передаем данные для записи в localStorage
	setLogAndPass(){
		this.validator.setLogAndPass(this.userDate);
	}

	// отправляем данные на проверку после 
	checkUserLogAndPass(){
		return this.validator.initComponent(this.inpEmail.value, this.inpPass.value);
	}//

	// инициализируем запуск галлереи
	initGallery(){
		this.validator.hideBlock(this.msgErr);
		this.validator.showBlock(this.menu);
		this.validator.showBlock(this.galleryBlock);
		this.validator.hideBlock(this.sectionLogPass);

		this.menu.querySelector('.galleryUserForm').classList.add('fontAccent')
		this.gallery = new this.CarsGallery();
		this.gallery.initComponent();
		this.getUserInfo();
	}//

	getUserInfo(){
		fetch(this.url)
			.then((responce) => responce.json())
			.then( (responce) => {
					this.userDateInfo = responce;
					this.fillUserInfo();
			})
	}
	
	fillUserInfo(){
		console.log("запускается ф-ция получения информации о пользователе");
		console.log(this.userDateInfo.id);
		console.log(this.userDateInfo.name);

		// console.log(userService.tempaleteWinInfoUser(this.userDateInfo));
		let result = userService.tempaleteWinInfoUser(this.userDateInfo);
		console.log(result);
		console.log(typeof result);
		this.blockUserInfo.innerHTML = result
	}

	// после уданого ввода пароля и логина скрываем сообщение обб ощибки и запускаем галлерею
	isValidUserData(event){
		event.preventDefault();
		(this.checkUserLogAndPass())? this.initGallery(): this.validator.showBlock(this.msgErr);
		
	}//

	showMenuItem(isMenuItem){
		let elemContainers = this.mainBlock.querySelectorAll('.container');
		[].slice.apply(elemContainers).forEach(element => element.classList.add('hide'));
		this.mainBlock.querySelector(`.${isMenuItem}`).classList.remove('hide');
		
		// усли открыто какое либо модальное окно(add,edit,view) закрывать его при переходе на др пункт меню
		this.modalForm.style.top = '';
		this.blockLargeImg.style.top = '';

	}//

	menuHandler(event){
		let isMenuItem = event.target.getAttribute('data-menu');
	 	if( !isMenuItem) return;

	 	config.configMenu[isMenuItem](event);
	 	this.showMenuItem(isMenuItem);
	}

	/************************************************************/ 
	initListener(){
		this.btnLog.addEventListener('click', this.isValidUserData.bind(this));
		this.menu.addEventListener('click', this.menuHandler.bind(this));
	}//

	// проверка при обновлении через F5 создан объект галлерея или нет
	checkLoad(){
		localStorage.getItem('state') && this.initGallery();
	}//

	initComponent(){
		this.checkLoad();
		this.initListener();
		this.setLogAndPass();
	}//

}




/*
let LoginForm = function (userData, validatorModule, CarsGallery ) {	
	this.validator = validatorModule;
	// this.CarsGallery = CarsGallery;
	this.CarsGallery = CarsGallery;
	this.userData = userData;

	this.mainBlock = document.querySelector('main');
	this.menu = document.querySelector('.main-nav');
	this.msgErr = document.querySelector('.err-msg');
	this.formLog = document.querySelector('.form-signin');
	this.inpEmail = document.querySelector('#inputEmail');
	this.inpPass = document.querySelector('#inputPassword');
	this.btnLog = document.querySelector('.btn-login');
	this.btnLogOut = document.querySelector('.btn-logout');

	this.galleryBlock = document.querySelector('.gallery-main-block');
	this.sectionLogPass = document.querySelector('.sectionLogPass');

	this.inpUserFormInfoLogin = document.querySelector('.inputUserInfoLogin');
	this.inpUserFormInfoPass = document.querySelector('.inputUserInfoPass');
	this.btnShowPass = document.querySelector('.btnShowPassword');
	this.btnBackToLogForm = document.querySelector('.btnBackToLogForm');
	this.gallery = null;
}//

LoginForm.prototype = {
	setLogAndPass: function(){
		this.validator.setLogAndPass(this.userData)		
	},//

	checkUserLogAndPass: function(){
		return this.validator.initComponent(this.inpEmail.value, this.inpPass.value);
	},//

	returnToGallary: function(event){
		// event.preventDefault();
		// event.target.closest('.menuUserInfo').classList.add('hide');
		// this.validator.showBlock(this.galleryBlock); 
		this.showItemMenu("menuGallery");

	},//

	showAndHidePass: function(){
		let typeAttr = (this.inpUserFormInfoPass.getAttribute('type') == 'password')? "text" : "password";
        this.inpUserFormInfoPass.setAttribute('type',typeAttr);
	},//

	fillUserInfo: function(){
		this.inpUserFormInfoLogin.value = localStorage.getItem("initLogin");
		this.inpUserFormInfoPass.value = localStorage.getItem("initPassword");;
	},//

	initGallery: function(){
		this.validator.hideBlock(this.msgErr);
		this.validator.showBlock(this.menu);
		this.validator.hideBlock(this.sectionLogPass);
		this.validator.showBlock(this.galleryBlock); 

		this.menu.querySelector('.galleryUserForm').classList.add('fontAccent')
		this.gallery = new this.CarsGallery();
		this.gallery.initComponent();
		this.fillUserInfo();

	},//

	isValidUserData: function(event){
		event.preventDefault();
		(this.checkUserLogAndPass())? this.initGallery(): this.validator.showBlock(this.msgErr);
		
	},//

	showItemMenu: function(itemMenu){
		let elemContainers = this.mainBlock.querySelectorAll('.container');
		[].slice.apply(elemContainers).forEach(element => element.classList.add('hide'));
		this.mainBlock.querySelector(`.${itemMenu}`).classList.remove('hide');
	},//	

	menuHandler : function(event){
		let itemMenu = event.target.getAttribute('data-menu');
		if(!itemMenu) return;

		config.configMenu[itemMenu](event);
		this.showItemMenu(itemMenu);
	},//

	initListener: function(){
		this.btnLog.addEventListener('click', this.isValidUserData.bind(this));
		this.menu.addEventListener('click', this.menuHandler.bind(this));
		this.btnShowPass.addEventListener('click', this.showAndHidePass.bind(this));
		this.btnBackToLogForm.addEventListener('click', this.returnToGallary.bind(this));
		
	},//

	checkLoad: function(){
		localStorage.getItem('state') && this.initGallery();
	},//

	initComponent : function(){
		this.checkLoad()
		this.setLogAndPass();
		this.initListener();
		
	},//
}



*/