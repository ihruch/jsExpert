(function(){
   let btnLog = document.querySelector('.btn-block');
      
    
    let initValidateForm = (e) => {
        e.preventDefault();
        loginService.initComponent();
    }
    
    let initListener = () => {
        btnLog.addEventListener('click', initValidateForm) 
    }
    let init = () => {
        loginService.setLogAndPass({login: "y@y.ru", password : "123"});
        initListener();
    }//
    init();

})()