function Validator(){

}//

Validator.prototype = {

	setLogAndPass : function(obj){
		for (const key in obj) {
			localStorage.setItem(key,obj[key]);
		}
	},//

	 // скрывает или показывает элементы 
	 toggleShow: function(elem){
        elem.hidden = !elem.hidden;
	},
	showBlock: function(elem){
       elem.classList.remove('hide');
	},
	hideBlock: function(elem){
	   elem.classList.add('hide');
    },

	// ф-ция проверки если поля не заполенены
    isEmptyFields: function(email,pass){
        return (email == "") || ( pass == "");
    },
    // ф-ция проверки валидности e-mail адреса
    isValidEmail: function(email){
        const reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;
        return reg.test(email);
	},
	
    // ф-ция сравнения логина и пароля
    compareLogAndPass:function(email,pass){
        return ((localStorage.getItem('initLogin') == email) && (localStorage.getItem('initPassword') == pass));
	},
	
    isFillErrorField: function(email,pass){
        return  !this.isEmptyFields(email.pass) && this.isValidEmail(email)
    },
    
	initComponent : function(email,pass){
		return this.isFillErrorField(email, pass) && this.compareLogAndPass(email,pass);
	},//

}//