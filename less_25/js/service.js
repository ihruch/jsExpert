var loginService = (function(){
   
    let msgError = document.querySelector('.error-msg'),
        emailInp = document.querySelector('#inputEmail'), 
        passwordInp = document.querySelector('#inputPassword'),
        windowInfoUser = document.querySelector('.windowInfoUser'),
        logForm = document.querySelector('.form-signin'),
        btnBacktoFormLog = document.querySelector('.btnBackToLogForm'),
        inputUserInfoLogin = document.querySelector('.inputUserInfoLogin');
        inputUserInfoPassword = document.querySelector('.inputUserInfoPass'),
        btnShowPassword = document.querySelector('.btnShowPassword');

    // let userData = {};

    function showErrorMsg(){
        msgError.hidden = !msgError.hidden;
    }
    function setLogAndPass(obj){
        for(let key in obj){
            localStorage.setItem(key,obj[key]);
            // userData[key] = obj[key];
        }
        // return userData;
    }//
    // ф-ция проверки если поля не заполенены
    let checkIsEmptyField = (email,password) =>{
        return ((email == "") && ( password == "" )) ||(email == '') || (password == '');
    }
    // ф-ция проверки валидности e-mail адреса
    let isValidEmail = (email) =>{
        const reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
        return reg.test(email);
    }
    // ф-ция сравнения логина и пароля
    let compareLogAndPass = (email,password) =>{
        return ((localStorage.getItem('login') === email) && (localStorage.getItem('password') == password));
    }
    // ф-ция перехода на информацию о ПОльзователе после успешной авторизации
    function windowShowInfoUser(){
        logForm.hidden = !logForm.hidden;
        windowInfoUser.hidden = !windowInfoUser.hidden;
        loadInfoUser()
    }
    // ф-ция возврата форму авторизации
    function returnToLogForm(){
        windowShowInfoUser();
        emailInp.value = ''; 
        passwordInp.value = '';
    }

    // Ф-ция которая устанавливает значение в окно информации о пользователе
    function loadInfoUser(){
        inputUserInfoLogin.disabled = !inputUserInfoLogin.disabled;
        inputUserInfoPassword.disabled = !inputUserInfoPassword.disabled;
        inputUserInfoLogin.value = localStorage.getItem('login');
        inputUserInfoPassword.value = localStorage.getItem('password');
    }
    // ф-ция показывает пароль пользователя 
    function showUserPassword(){
        let elem = inputUserInfoPassword.getAttribute('type');
        (elem == 'password')? inputUserInfoPassword.setAttribute('type','text') : inputUserInfoPassword.setAttribute('type','password'); 
    }

    // ф-ция проверки введенных значени
    function initComponent(){
        let email = emailInp.value
        let password = passwordInp.value

        let status = !checkIsEmptyField(email,password) && isValidEmail(email);
        (status)?( (compareLogAndPass(email,password))? windowShowInfoUser() : showErrorMsg() )  : showErrorMsg(); 
    }

    // слушатели   
    btnBacktoFormLog.addEventListener('click',returnToLogForm);
    btnShowPassword.addEventListener('click',showUserPassword);
    
    
    return {
        setLogAndPass : setLogAndPass,
        initComponent : initComponent
    }


})()