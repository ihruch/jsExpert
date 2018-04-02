var userService = (function(){
		
	function tempaleteWinInfoUser(item){
		return `<div class="row">
					<div class="col-md-12">
						<div class="detail-info">
						<form class="novalidate-info" novalidate>
							<h3 class="text-center mb-4">Информация о пользователе</h3>
	
								<div class="row d-flex mb-2" >
									<div class="col-md-6 col-left">
										<label for="infoName">Имя</label>
										<input type="text" class="form-control" value="${item.name}" disabled>
									</div>
									<div class="col-md-6 col-right">
										<label for="infoRole">Роль</label>
										<input type="text" class="form-control" value="${item.role}" disabled>
									</div>
								</div>

								<div class="row d-flex mb-2" >
									<div class="col-md-6 col-left">
										<label for="infoLogin">Логин</label>
										<div class="input-group">
											<span class="input-group-addon" id="sizing-addon2">@</span>
											<input type="text" class="form-control" value="${item.username}" disabled aria-describedby="sizing-addon2">
										</div>
									</div>
									<div class="col-md-6 col-right">
										<label for="infEmail">E-mail</label>
										<input type="text" class="form-control" value="${item.email}" disabled>
									</div>
								</div>
	
								<div class="mb-2">
									<label for="infEmail">Компания</label>
									<input type="text" class="form-control" value="${item.company.name}" disabled>
								</div>

								<div class="mb-2">
									<label for="infEmail">Телефон</label>
									<input type="text" class="form-control" value="${item.phone}" disabled>
								</div>

								<div class="mb-2">
									<label for="infoAdress">Адрес</label>
									<input type="text" class="form-control" value="${item.address.zipcode}, ${item.address.city}, ${item.address.street}" disabled>
								</div>
								<div class="mb-2">
									<label for="infoSite">Сайт</label>
									<input type="text" class="form-control" value="${item.website}" disabled>
								</div>
						</form>   
						<hr>   
						</div>
					</div>
				</div> `  
	}

	return{
		tempaleteWinInfoUser : tempaleteWinInfoUser	
	}

})()

