var loginService = (function(){

    function setLogAndPass(obj){
        for( let key in obj ){
            localStorage.setItem(key,obj[key]);
        }
    }//

    // ф-ция проверки если поля не заполенены
    let isEmptyFields = (email,pass) =>{
        return (email == "") || ( pass == "");
    }
    // ф-ция проверки валидности e-mail адреса
    let isValidEmail = (email) =>{
        const reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
        return reg.test(email);
    }
    // ф-ция сравнения логина и пароля
    let compareLogAndPass = (email,pass) =>{
        return ((localStorage.getItem('login') == email) && (localStorage.getItem('password') == pass));
    }
    function isFillErrorField(email,pass){
        return  !isEmptyFields(email.pass) && isValidEmail(email)
    }
    function isValueCompare(email,pass){
        return compareLogAndPass(email,pass);
    }

    function initComponent(email, pass){
       return isFillErrorField(email, pass) && isValueCompare(email,pass);
    }//
    
    // скрывает или показывает элементы 
    function toggleShow(elem){
        elem.hidden = !elem.hidden;
    }

    //функция наследования
    function inheritance(parent, child) {
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for (let key in tempChild) {
            if (tempChild.hasOwnProperty(key)) {
                child.prototype[key] = tempChild[key];
            }
        }
    }   
    
        return {
            setLogAndPass : setLogAndPass,
            initComponent : initComponent,
            inheritance : inheritance,
            toggleShow : toggleShow
        }

})()//