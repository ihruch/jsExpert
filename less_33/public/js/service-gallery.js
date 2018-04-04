var serviceGallery = (function(){

	function duplicateData(arr,count){
		let result = [];
		for (let i = 0; i < count; i++) {
			result = result.concat(arr.map( (item) => {return Object.assign({},item)}));				
		}
		return result;
	};


	function checkURL(url){
		return ~url.indexOf("://")?url:`http://${url}`;
	};
	function checkNAME(name){
		return `${name.slice(0,1).toUpperCase()}${name.slice(1).toLowerCase()}`;
		
	};
	function checkDESC(description){
		return (description.length > 18)? `${description.slice(0,18)}...` : `${description}`;	
	};
	function checkDATE(date){
		return moment(date).format('DD/MM/YYYY');
	}

	function modifyData(array){
		array.forEach( (item) => {
			item.url = checkURL(item.url);
   			item.name = checkNAME(item.name);
			item.description = 	checkDESC(item.description);
			item.newDate = checkDATE(item.date);		
		});	
		return array;
	};

	function templateHTML(item){
		return ` <div class="col-md-4">
				<div class="card mb-4 box-shadow" data-id-remove="${item.id}">
				<img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="DEWOO" src="${item.url}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
					<div class="card-body" >
						<p class="card-name">${item.name}</p>
						<p class="card-text">${item.description}.</p>
						<div class="d-flex justify-content-between align-items-center control-btn-card">
							<div class="btn-group">
								<button type="button" class="btn btn-outline-secondary" data-type-btn="viewBtn">View</button>
								<button type="button" class="btn btn-outline-secondary" data-type-btn="editBtn">Edit</button>
							</div>
								<a href="#" class="btn btn-danger" data-id-remove="${item.id}" data-type-btn="delBtn">Удалить</a>
							<small class="text-muted">${item.newDate}</small>
						</div>
					</div>
				</div> 
			</div>`;
	}
	
	function sortNameAZ(a,b) {return a.email > b.email? 1 : -1 }
    function sortNameZA(a,b){return a.email > b.email? -1 : 1 }
    function sortDateAsc(a,b){return a.date - b.date}
    function sortDateDesc(item){return b.date - a.date }

	function inheritance(parent, child) {
		let tempChild = child.prototype;
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
	
		for (let key in tempChild) {
			if (tempChild.hasOwnProperty(key)) {
				child.prototype[key] = tempChild[key];
			}
		}
	}//
	return{
		duplicateData : duplicateData,
		modifyData : modifyData, 
		templateCard : templateHTML,
		inheritance : inheritance,
		sortNameAZ : sortNameAZ,
		sortNameZA : sortNameZA, 
		sortDateAsc : sortDateAsc,
		sortDateDesc : sortDateDesc
		
	}
})()