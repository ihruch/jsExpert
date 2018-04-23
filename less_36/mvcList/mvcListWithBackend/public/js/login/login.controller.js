export default class LoginController { 
    constructor(model, view, utils) {
        this.model = model;
        this.view = view;
        this.utils = utils;
        this.initListeners();
    } 

    initListeners() { 
        this.view.DOMElements.logInBtn.addEventListener("click", this.loginHandler.bind(this));
        this.view.DOMElements.logOutBtn.addEventListener("click", this.logoutHandler.bind(this));
    }

    loginHandler(e) {
        e.preventDefault();
        let credentials = this.view.getCredentials();
        if (this.model.validate(credentials)){
            this.model.login(credentials).then(
                data => {
                    if (data.loginStatus){
                        this.view.hideMsg();
                        this.view.showLogout();
                        this.utils.navigateTo("gallery");
                    } else {
                        this.view.showMsg(this.model.getErrorMsg());
                    }
                }
            );
        } else {
            this.view.showMsg(this.model.getErrorMsg());
        }
    }

    logoutHandler() {
        this.view.hideLogout();
        this.model.logout();
        this.utils.navigateTo("");
    }

    //init() { }
    
}
