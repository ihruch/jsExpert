var loginService = (function(){
   
    let msgError = document.querySelector('.error-msg'),
        emailInp = document.querySelector('#inputEmail'), 
        passwordInp = document.querySelector('#inputPassword'),
        windowInfoUser = document.querySelector('.windowInfoUser'),
        logForm = document.querySelector('.form-signin'),
        btnBacktoFormLog = document.querySelector('.btnBackToLogForm'),
        inputUserInfoLogin = document.querySelector('.inputUserInfoLogin');
        inputUserInfoPassword = document.querySelector('.inputUserInfoPass'),
        btnShowPassword = document.querySelector('.btnShowPassword'),
        saveMe = document.querySelector('.saveMe'),
        statusCheck = null;

    //запись в localStorage
    function setLogAndPass(obj){
        for( let key in obj ){
            localStorage.setItem(key,obj[key]);
        }
    }//
    function toggleShow(elem){
        elem.hidden = !elem.hidden;
    }

    function showErrorMsg(){
        // msgError.hidden = !msgError.hidden;
        msgError.classList.remove('hide');
    }
    function hideErrorMsg(){
        msgError.classList.add('hide');
    }
   
    // ф-ция проверки если поля не заполенены
    let isEmptyFields = (email,password) =>{
        return (email == "") || ( password == "");
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
    // ф-ция перехода на информацию о Пользователе после успешной авторизации
    function windowShowInfoUser(){
        hideErrorMsg();
        toggleShow(logForm);
        toggleShow(windowInfoUser);
        loadInfoUser();
        checkBoxRememberMe();
    }
    // снимает статус чекера запомнить или нет
    function checkBoxRememberMe(){
       return statusCheck = saveMe.checked;
    }
   
    // ф-ция возврата форму авторизации
    function returnToLogForm(){
        windowShowInfoUser();
        if(statusCheck){
            emailInp.value = localStorage.getItem('login'); 
            passwordInp.value = localStorage.getItem('password'); 
        }else {
            emailInp.value = ''; 
            passwordInp.value = '';  
        }
    }

    // Ф-ция которая устанавливает значение в окно информации о пользователе
    function loadInfoUser(){
        inputUserInfoLogin.value = localStorage.getItem('login');
        inputUserInfoPassword.value = localStorage.getItem('password');
    }
    // ф-ция показывает пароль пользователя 
    function showUserPassword(){
        let typeAttr = ( inputUserInfoPassword.getAttribute('type') == 'password')? "text" : "password";
        inputUserInfoPassword.setAttribute('type',typeAttr);
        btnShowPassword.innerHTML = (btnShowPassword.innerHTML == 'Show')? 'Hidden': 'Show';
    }
    function isValueTrueField(email,password){
        return !isEmptyFields(email,password) && isValidEmail(email);
    }//

    function isValueCompare(email,password){
        (compareLogAndPass(email,password))? windowShowInfoUser() : showErrorMsg();
        
    }
    // ф-ция проверки введенных значени
    function initComponent(){
        let email = emailInp.value;
        let password = passwordInp.value;
        isValueTrueField(email,password) && isValueCompare(email,password)
        showErrorMsg();
       
    }

    //   
    btnBacktoFormLog.addEventListener('click',returnToLogForm);
    btnShowPassword.addEventListener('click',showUserPassword);
    saveMe.addEventListener('change', checkBoxRememberMe );
        
    return {
        setLogAndPass : setLogAndPass,
        initComponent : initComponent
    }


})()