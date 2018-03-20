var serviceGallery = (function(){

	function duplicateData(arr,count){
		let result = [];
		for (let i = 0; i < count; i++) {
			result = result.concat(arr.map( (item) => {return Object.assign({},item)}));				
		}
		return result;
	};

	function modifyData(array){
		array.forEach( (item) => {
			item.url = `http://${item.url}`;
   			item.name = `${item.name[0].toUpperCase()}${item.name.slice(1).toLowerCase()} `;
			item.description = (item.description.length > 18)? `${item.description.slice(0,18)}...` : `${item.description}`;		
			item.newDate = moment(item.date).format('DD/MM/YYYY');		
					
		});	
		return array;
	};

	function templateHTML(item){
		
		return ` <div class="col-md-4">
				<div class="card mb-4 box-shadow">
				<img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="DEWOO" src="${item.url}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
					<div class="card-body">
						<p class="card-name">${item.id}: ${item.name}</p>
						<p class="card-text">${item.description}.</p>
						<div class="d-flex justify-content-between align-items-center">
							<div class="btn-group">
							<button type="button" class="btn btn-outline-secondary">View</button>
								<button type="button" class="btn btn-outline-secondary">Edit</button>
							</div>
						<a href="#" class="btn btn-danger" data-id-remove="${item.id}">Удалить</a>
							<small class="text-muted">${item.newDate}</small>
						</div>
					</div>
				</div> 
			</div>`;
	}
	function showBlock(elem){
		elem.classList.remove('hide');
	};

	 function hideBlock(elem){
		elem.classList.add('hide');
	 };

	return{
		duplicateData : duplicateData,
		modifyData : modifyData, 
		templateCard : templateHTML,
		showBlock : showBlock,
		hideBlock : hideBlock
	}
})()