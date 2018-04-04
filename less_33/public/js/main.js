/* 
*  Схема инициализации приложения
*/
var userData = {
    "initLogin": "mail@mail.ru",
	"initPassword": 123
}

let validatorModule = new Validator();

let galleryModule = new CarsGallery();
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(userData, validatorModule, galleryModule); 
loginForm.initComponent();

