

let LoginForm = function (userData, validatorModule, BaseGallery) {	
	this.validator = validatorModule;
	this.BaseGallery = BaseGallery;
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
		this.gallery = new this.BaseGallery();
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
