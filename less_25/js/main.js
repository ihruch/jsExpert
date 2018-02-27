(function(){
   let btnLog = document.querySelector('.btn-block');
      
    let setUserLogAndPass = () => {
        loginService.setLogAndPass({
            login: "h@ya.ru",
            password : "123"
        });
    }
    let getValueForm = (e) => {
        setUserLogAndPass();
        e.preventDefault();
        loginService.initComponent();
    }
    
    let initListener = () => {
        btnLog.addEventListener('click', getValueForm) 
    }
    let init = () => {
        setUserLogAndPass();
        initListener();
    }//
    init();

})()