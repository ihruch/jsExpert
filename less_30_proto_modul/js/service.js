var listService = (function(){
    // делаем кол-во копий исходного массива
    function duplicateData(arr,count){
        let result = [];
        for (let i = 0; i < count; i++) {
            result = result.concat(arr.map( (item)=> { return Object.assign({},item)} ))    
        }    
        return result;
    }//
    
    function initTooltip(){
		$('[data-toggle="tooltip"]').tooltip();
	}//

    function templateRow(item){
        return `<tr>
                    <td><input type="checkbox"></td>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.username}</td>
                    <td>${item.role}</td>
                    <td>${item.email}</td>
                    <td data-toggle="tooltip" data-placement="top" title="${item.address.zipcode}, ${item.address.city}, ${item.address.street}">${item.address.city}</td>
                    <td>${item.website}</td>
                    <td>
                        <div class="text-center">
                            <a href="#" data-row-id="${item.id}" class="btn btn-primary btn-sm">Открыть</a>
                        </div>
                    </td>
                </tr>`
    }//

    function tempaleteWinInfoUser(item){
        return `<div class="container" >
                    <div class="row mb-5">
                        <div class="col-md-12 text-center">
                            <h1 class="mt-5">Список пользователей</h1>
                            <p>На этой странице вы можете увидеть всех пользователей системы, их контактные данные и уровень доступа.</p>
                        </div>
                    </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="detail-info">
                        <form class="novalidate-info" novalidate>
                            <h3 class="text-left">Информация о пользователе</h3>

                                <div class="row d-flex" >
                                    <div class="col-md-6 col-left">
                                        <label for="infoName">Имя</label>
                                        <input type="text" class="form-control" value="${item.name}" disabled>
                                    </div>
                                    <div class="col-md-6 col-right">
                                        <label for="infoRole">Роль</label>
                                        <input type="text" class="form-control" value="${item.role}" disabled>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="infoLogin">Логин</label>
                                    <div class="input-group">
                                        <span class="input-group-addon" id="sizing-addon2">@</span>
                                        <input type="text" class="form-control" value="${item.username}" disabled aria-describedby="sizing-addon2">
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="infEmail">E-mail( Опционально )</label>
                                    <input type="text" class="form-control" value="${item.email}" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="infoAdress">Адрес</label>
                                    <input type="text" class="form-control" value="${item.address.zipcode}, ${item.address.city}, ${item.address.street}" disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="infoSite">Сайт</label>
                                    <input type="text" class="form-control" value="${item.website}" disabled>
                                </div>
                        </form>   
                        <hr>   
                        
                        </div>
                        <button class="btn btn-primary btn-lg btnBack">Ok! Вернуться назад</button>
                    </div>
                </div>     
            </div> `  
    }

    /**********Сортировки*******************/ 
    function sortEmailAsc(a,b) {return a.email > b.email? 1 : -1 }
    function sortEmailDesc(a,b){return a.email > b.email? -1 : 1 }
    function filterUserRole(item){return item.role == "User"}
    function filterAdminRole(item) {return item.role == "Admin" }

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

    return{
        duplicateData : duplicateData,
        templateRowTable : templateRow,
        initTooltip : initTooltip,
        windowInfoUser : tempaleteWinInfoUser,
        sortEmailAsc : sortEmailAsc,
        sortEmailDesc : sortEmailDesc, 
        filterAdminRole : filterAdminRole,
        filterUserRole : filterUserRole,
        inheritance : inheritance
    }
})()//