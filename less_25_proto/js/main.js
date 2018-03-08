function LoginForm(){
    this.msgError = document.querySelector('.error-msg');
    this.emailInp = document.querySelector('#inputEmail');
    this.btnLog = document.querySelector('.btn-block');
    this.passwordInp = document.querySelector('#inputPassword');
    this.logForm = document.querySelector('.form-signin');
    this.saveMe = document.querySelector('.saveMe');
    

}//
LoginForm.prototype = {
    setLoginAndPass: function(){
        loginService.setLogAndPass({login:"a@ya.ru",password:1212})
    },

    checkUserLogAndPass: function(){
        this.emailVal = this.emailInp.value;
        this.passVal = this.passwordInp.value;
        return loginService.initComponent(this.emailVal, this.passVal);
    },

    showErrorMsg: function(){
        this.msgError.classList.remove('hide');
    },

    hideErrorMsg: function (){
        this.msgError.classList.add('hide');
    },

    isValidUserData: function(e){
        e.preventDefault();
        (!this.checkUserLogAndPass())? this.showErrorMsg() : this.hideErrorMsg();
    },

    initListeners: function () {
        this.btnLog.addEventListener('click', this.isValidUserData.bind(this));
    },

    initComponent: function () {
        this.setLoginAndPass();
        this.initListeners();
    }
}//

// let loginForm = new LoginForm();
// loginForm.initComponent();

/**********************************************************************************/ 
function UserInfoForm(){
    LoginForm.apply(this);
    this.windowInfoUser = document.querySelector('.windowInfoUser');
    this.inputUserInfoLogin = document.querySelector('.inputUserInfoLogin');
    this.inputUserInfoPassword = document.querySelector('.inputUserInfoPass');
    this.btnShowPassword = document.querySelector('.btnShowPassword');
    this.btnBacktoFormLog = document.querySelector('.btnBackToLogForm');
    this.statusCheck = null;
}//

UserInfoForm.prototype = {
  
    initListeners: function () {
        LoginForm.prototype.initListeners.apply(this);
        this.btnBacktoFormLog.addEventListener('click', this.returnToLogForm.bind(this));
        this.btnShowPassword.addEventListener('click', this.showUserPassword.bind(this));
        this.saveMe.addEventListener('change', this.checkBoxRememberMe.bind(this) );
    },

    // Получение данных  из LocalStorage
    loadInfoUser: function(){
        this.inputUserInfoLogin.value = localStorage.getItem('login');
        this.inputUserInfoPassword.value = localStorage.getItem('password');
    },

    // снимает статус чекера запомнить или нет
    checkBoxRememberMe: function(){
        return this.statusCheck = this.saveMe.checked;
    },
    // показывает при нажатии пароль или скрываетб также меняет надписьна кнопке
    showUserPassword : function(){
        let typeAttr = ( this.inputUserInfoPassword.getAttribute('type') == 'password')? "text" : "password";
        this.inputUserInfoPassword.setAttribute('type',typeAttr);
        this.btnShowPassword.innerHTML = (this.btnShowPassword.innerHTML == 'Show')? 'Hidden': 'Show';
    },

    // при возврате проверяет стояла галочка запомнить логин пароль или нет
    returnToLogForm : function (){
        this.windowShowInfoUser();
        if(this.statusCheck){
            this.emailInp.value = localStorage.getItem('login'); 
            this.passwordInp.value = localStorage.getItem('password'); 
        }else {
            this.emailInp.value = ''; 
            this.passwordInp.value = '';  
        }
    },
    // ф-ция перехода на форму информация о Пользователе после успешной авторизации
    windowShowInfoUser: function(){
        loginService.toggleShow(this.logForm);
        loginService.toggleShow(this.windowInfoUser);
        this.loadInfoUser();
        this.checkBoxRememberMe();
    },    
    
    // 
    isValidUserData: function(e){
        e.preventDefault();
        if(!this.checkUserLogAndPass()){
             this.showErrorMsg() 
        }else{
              this.hideErrorMsg();
              this.windowShowInfoUser();
        }   
    }

}//

loginService.inheritance(LoginForm, UserInfoForm);

let userInfo = new UserInfoForm();
userInfo.initComponent();