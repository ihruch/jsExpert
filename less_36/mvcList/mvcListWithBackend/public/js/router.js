import utils from './utils.js';
import Observer from './gallery/observer.js';
import GalleryController from './gallery/gallery.controller.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';

import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

let login = document.querySelector("#login-view");
let main = document.querySelector("#main-view");
let contact = document.querySelector("#contact-view");
let activatedRoutes = {};

let routeConfig = {
    "" : {
        show : () => {
            utils.showView([login]);
            utils.hideView([main, contact]);
        },
        init : () => {
            let model = new LoginModel;
            let view = new LoginView;
            new LoginController(model, view, utils)
        }
    },
    "gallery" : {
        show : () => {
            utils.showView([main]);
            utils.hideView([login, contact]);
            console.log("Main route is loaded")
        },
        init : () => {
            let observer = new Observer;
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(model, view, observer, new utils)
        }
    },
    "contacts" : {
        show : () => {
            utils.showView([contact]);
            utils.hideView([main, login]);
            console.log("Contacts route is loaded")
        },
        init : () => {
            //implement Controller, View and Model for this Route
        }
    }
}

function activateRoute(routeName){
    if (activatedRoutes[routeName]) {
        activatedRoutes[routeName]();
    } else {
        let route = routeConfig[routeName];
        if (route) {
            route.init();
            route.show();
            activatedRoutes[routeName] = route.show;
        }
    } 
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName && !utils.isLoggedIn()) {
        utils.navigateTo(""); 
    } else {
        activateRoute(routeName);
    }
    
}
