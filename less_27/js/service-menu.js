var config = (function(){

	let configMenu = {
		"menuGallery": function(event){
			event.currentTarget.querySelector('.fontAccent').classList.remove("fontAccent");
			event.target.classList.add('fontAccent');
		},
		"menuUserInfo": function(event){
			event.currentTarget.querySelector('.fontAccent').classList.remove("fontAccent");
			event.target.classList.add("fontAccent");
		},
		"menuBtnLogOut": function(event){
			localStorage.removeItem('state');
			event.currentTarget.classList.add("hide");
		}
	}
	
	return{
		configMenu: configMenu
	}
})()